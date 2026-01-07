const Transaction = require('../models/Transaction');
const Reward = require('../models/Reward');

/**
 * Obtener historial de transacciones de una recompensa
 */
exports.getTransactionsByReward = async (req, res) => {
  try {
    const { rewardId } = req.params;

    // Verificar que la recompensa existe
    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Recompensa no encontrada'
      });
    }

    // Obtener transacciones
    const transactions = await Transaction.find({ reward: rewardId })
      .populate('from', 'name email')
      .populate('to', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener transacciones'
    });
  }
};

/**
 * Obtener historial de transacciones del usuario
 */
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    // Obtener transacciones donde el usuario es from o to
    const transactions = await Transaction.find({
      $or: [
        { from: userId },
        { to: userId }
      ]
    })
      .populate('reward')
      .populate('from', 'name email')
      .populate('to', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    console.error('Error al obtener transacciones del usuario:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener transacciones'
    });
  }
};
