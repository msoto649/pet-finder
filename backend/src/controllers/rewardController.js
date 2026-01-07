const Reward = require('../models/Reward');
const Transaction = require('../models/Transaction');
const Pet = require('../models/Pet');
const User = require('../models/User');
const stripeService = require('../services/stripeService');

/**
 * Crear una nueva recompensa con pre-autorización de pago
 */
exports.createReward = async (req, res) => {
  try {
    const { petId, amount, currency, description, paymentMethodId } = req.body;

    // Validar campos requeridos
    if (!petId || !amount) {
      return res.status(400).json({
        success: false,
        message: 'El ID de la mascota y el monto son requeridos'
      });
    }

    // Validar que la mascota existe
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }

    // Validar que el usuario es el dueño de la mascota
    if (!pet.owner || pet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede crear una recompensa'
      });
    }

    // Verificar si ya existe una recompensa activa
    if (pet.hasReward && pet.reward) {
      const existingReward = await Reward.findById(pet.reward);
      if (existingReward && ['pending', 'held'].includes(existingReward.status)) {
        return res.status(400).json({
          success: false,
          message: 'Ya existe una recompensa activa para esta mascota'
        });
      }
    }

    // Crear o obtener cliente de Stripe
    let stripeCustomerId = req.user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripeService.createCustomer(req.user.email, req.user.name);
      stripeCustomerId = customer.id;

      // Actualizar usuario con el ID de cliente
      await User.findByIdAndUpdate(req.user._id, {
        stripeCustomerId: stripeCustomerId
      });
    }

    // Asociar método de pago si se proporcionó
    if (paymentMethodId) {
      await stripeService.attachPaymentMethod(stripeCustomerId, paymentMethodId);
    }

    // Crear PaymentIntent en Stripe (pre-autorización)
    const paymentIntent = await stripeService.createPaymentIntent(
      amount,
      currency || 'USD',
      stripeCustomerId,
      {
        petId: petId,
        petName: pet.name,
        ownerId: req.user._id.toString()
      }
    );

    // Crear recompensa en la base de datos
    const reward = await Reward.create({
      pet: petId,
      owner: req.user._id,
      amount: amount,
      currency: currency || 'USD',
      description: description,
      status: 'pending',
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status
    });

    // Actualizar mascota
    await Pet.findByIdAndUpdate(petId, {
      hasReward: true,
      reward: reward._id
    });

    // Crear registro de transacción
    await Transaction.create({
      reward: reward._id,
      type: 'payment',
      amount: amount,
      currency: currency || 'USD',
      status: 'pending',
      stripeTransactionId: paymentIntent.id,
      from: req.user._id,
      description: 'Creación de recompensa'
    });

    res.status(201).json({
      success: true,
      data: reward,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error al crear recompensa:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear recompensa'
    });
  }
};

/**
 * Actualizar el monto de la recompensa
 */
exports.updateRewardAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El monto debe ser mayor a 0'
      });
    }

    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada'
      });
    }

    // Validar que el usuario es el dueño
    if (reward.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'No autorizado'
      });
    }

    // Solo permitir actualizar si está en estado pending
    if (reward.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solo se puede actualizar el monto cuando está en estado pendiente'
      });
    }

    // Actualizar PaymentIntent en Stripe
    await stripeService.updatePaymentIntent(reward.stripePaymentIntentId, amount);

    // Actualizar recompensa
    reward.amount = amount;
    await reward.save();

    // Registrar transacción
    await Transaction.create({
      reward: reward._id,
      type: 'payment',
      amount: amount,
      currency: reward.currency,
      status: 'completed',
      from: req.user._id,
      description: 'Actualización de monto de recompensa'
    });

    res.json({
      success: true,
      data: reward
    });
  } catch (error) {
    console.error('Error al actualizar recompensa:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar recompensa'
    });
  }
};

/**
 * Retener el pago cuando alguien reporta haber encontrado la mascota
 */
exports.holdRewardPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { finderId } = req.body;

    const reward = await Reward.findById(id).populate('pet');
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada'
      });
    }

    // Validar estado
    if (reward.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'La recompensa no está disponible'
      });
    }

    // Validar que el finder existe
    const finder = await User.findById(finderId);
    if (!finder) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Capturar el PaymentIntent en Stripe (hold)
    const paymentIntent = await stripeService.capturePaymentIntent(
      reward.stripePaymentIntentId
    );

    // Actualizar recompensa
    reward.status = 'held';
    reward.finder = finderId;
    reward.stripePaymentStatus = paymentIntent.status;
    await reward.save();

    // Registrar transacción
    await Transaction.create({
      reward: reward._id,
      type: 'hold',
      amount: reward.amount,
      currency: reward.currency,
      status: 'completed',
      stripeTransactionId: paymentIntent.id,
      from: reward.owner,
      to: finderId,
      description: 'Retención de pago - mascota reportada como encontrada'
    });

    res.json({
      success: true,
      data: reward,
      message: 'Pago retenido exitosamente'
    });
  } catch (error) {
    console.error('Error al retener pago:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al retener pago'
    });
  }
};

/**
 * Liberar el pago al finder cuando el dueño confirma
 */
exports.releaseRewardPayment = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Reward.findById(id).populate('pet finder');
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada'
      });
    }

    // Validar que el usuario es el dueño
    if (reward.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede liberar el pago'
      });
    }

    // Validar estado
    if (reward.status !== 'held') {
      return res.status(400).json({
        success: false,
        message: 'La recompensa no está en estado retenido'
      });
    }

    // Verificar que el finder tiene cuenta de Stripe (opcional en este momento)
    // En producción, el finder necesitaría configurar Stripe Connect
    // Por ahora, solo marcamos como pagado

    // Actualizar recompensa
    reward.status = 'paid';
    reward.paidAt = new Date();
    await reward.save();

    // Actualizar estado de la mascota a 'Reunido'
    await Pet.findByIdAndUpdate(reward.pet._id, {
      status: 'Reunido'
    });

    // Registrar transacción
    await Transaction.create({
      reward: reward._id,
      type: 'release',
      amount: reward.amount,
      currency: reward.currency,
      status: 'completed',
      from: reward.owner,
      to: reward.finder,
      description: 'Liberación de pago - mascota recuperada'
    });

    res.json({
      success: true,
      data: reward,
      message: 'Pago liberado exitosamente'
    });
  } catch (error) {
    console.error('Error al liberar pago:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al liberar pago'
    });
  }
};

/**
 * Cancelar recompensa y reembolsar
 */
exports.cancelReward = async (req, res) => {
  try {
    const { id } = req.params;

    const reward = await Reward.findById(id);
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada'
      });
    }

    // Validar que el usuario es el dueño
    if (reward.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede cancelar la recompensa'
      });
    }

    // Solo permitir cancelar si está en pending
    if (!['pending', 'held'].includes(reward.status)) {
      return res.status(400).json({
        success: false,
        message: 'No se puede cancelar una recompensa en este estado'
      });
    }

    // Cancelar PaymentIntent en Stripe
    await stripeService.cancelPaymentIntent(reward.stripePaymentIntentId);

    // Actualizar recompensa
    reward.status = 'cancelled';
    await reward.save();

    // Actualizar mascota
    await Pet.findByIdAndUpdate(reward.pet, {
      hasReward: false
    });

    // Registrar transacción
    await Transaction.create({
      reward: reward._id,
      type: 'refund',
      amount: reward.amount,
      currency: reward.currency,
      status: 'completed',
      from: reward.owner,
      description: 'Cancelación de recompensa'
    });

    res.json({
      success: true,
      data: reward,
      message: 'Recompensa cancelada exitosamente'
    });
  } catch (error) {
    console.error('Error al cancelar recompensa:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al cancelar recompensa'
    });
  }
};

/**
 * Obtener información de recompensa por ID de mascota
 */
exports.getRewardByPet = async (req, res) => {
  try {
    const { petId } = req.params;

    const reward = await Reward.findOne({ pet: petId })
      .populate('owner', 'name email')
      .populate('finder', 'name email')
      .sort({ createdAt: -1 });

    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró recompensa para esta mascota'
      });
    }

    res.json({
      success: true,
      data: reward
    });
  } catch (error) {
    console.error('Error al obtener recompensa:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener recompensa'
    });
  }
};

/**
 * Obtener todas las recompensas del usuario
 */
exports.getUserRewards = async (req, res) => {
  try {
    const userId = req.user._id;

    // Obtener recompensas como dueño
    const asOwner = await Reward.find({ owner: userId })
      .populate('pet', 'name type status image')
      .populate('finder', 'name email')
      .sort({ createdAt: -1 });

    // Obtener recompensas como finder
    const asFinder = await Reward.find({ finder: userId })
      .populate('pet', 'name type status image')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        asOwner,
        asFinder
      }
    });
  } catch (error) {
    console.error('Error al obtener recompensas del usuario:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener recompensas'
    });
  }
};
