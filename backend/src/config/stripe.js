const Stripe = require('stripe');

// Inicializar Stripe con la clave secreta
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  WARNING: STRIPE_SECRET_KEY not configured. Stripe features will not work.');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

module.exports = stripe;
