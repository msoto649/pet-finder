const stripe = require('../config/stripe');
const Reward = require('../models/Reward');
const Transaction = require('../models/Transaction');

/**
 * Manejar webhooks de Stripe
 */
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verificar la firma del webhook
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Error de verificación de webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Manejar el evento
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object);
        break;

      case 'payment_intent.canceled':
        await handlePaymentIntentCanceled(event.data.object);
        break;

      case 'transfer.created':
        await handleTransferCreated(event.data.object);
        break;

      case 'transfer.failed':
        await handleTransferFailed(event.data.object);
        break;

      default:
        console.log(`Evento no manejado: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error al procesar webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar webhook'
    });
  }
};

/**
 * Manejar PaymentIntent exitoso
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    const reward = await Reward.findOne({
      stripePaymentIntentId: paymentIntent.id
    });

    if (reward) {
      reward.stripePaymentStatus = 'succeeded';
      await reward.save();

      // Actualizar transacción correspondiente
      await Transaction.findOneAndUpdate(
        {
          reward: reward._id,
          stripeTransactionId: paymentIntent.id
        },
        {
          status: 'completed'
        }
      );

      console.log(`PaymentIntent succeeded for reward: ${reward._id}`);
    }
  } catch (error) {
    console.error('Error al manejar payment_intent.succeeded:', error);
  }
}

/**
 * Manejar fallo en PaymentIntent
 */
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    const reward = await Reward.findOne({
      stripePaymentIntentId: paymentIntent.id
    });

    if (reward) {
      reward.stripePaymentStatus = 'failed';
      await reward.save();

      // Actualizar transacción correspondiente
      await Transaction.findOneAndUpdate(
        {
          reward: reward._id,
          stripeTransactionId: paymentIntent.id
        },
        {
          status: 'failed'
        }
      );

      console.log(`PaymentIntent failed for reward: ${reward._id}`);
    }
  } catch (error) {
    console.error('Error al manejar payment_intent.failed:', error);
  }
}

/**
 * Manejar cancelación de PaymentIntent
 */
async function handlePaymentIntentCanceled(paymentIntent) {
  try {
    const reward = await Reward.findOne({
      stripePaymentIntentId: paymentIntent.id
    });

    if (reward) {
      reward.stripePaymentStatus = 'canceled';
      await reward.save();

      // Actualizar transacción correspondiente
      await Transaction.findOneAndUpdate(
        {
          reward: reward._id,
          stripeTransactionId: paymentIntent.id
        },
        {
          status: 'cancelled'
        }
      );

      console.log(`PaymentIntent canceled for reward: ${reward._id}`);
    }
  } catch (error) {
    console.error('Error al manejar payment_intent.canceled:', error);
  }
}

/**
 * Manejar transferencia creada
 */
async function handleTransferCreated(transfer) {
  try {
    console.log(`Transfer created: ${transfer.id}`);
    // Aquí puedes agregar lógica adicional si es necesario
  } catch (error) {
    console.error('Error al manejar transfer.created:', error);
  }
}

/**
 * Manejar fallo en transferencia
 */
async function handleTransferFailed(transfer) {
  try {
    console.log(`Transfer failed: ${transfer.id}`);
    // Aquí puedes agregar lógica para manejar fallos en transferencias
  } catch (error) {
    console.error('Error al manejar transfer.failed:', error);
  }
}
