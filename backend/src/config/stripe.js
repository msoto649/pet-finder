const Stripe = require('stripe');

// Inicializar Stripe con la clave secreta
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');

module.exports = stripe;
