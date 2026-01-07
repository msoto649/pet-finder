import { loadStripe } from '@stripe/stripe-js';

// Inicializar Stripe con la publishable key
// NOTA: En producción, usar variable de entorno
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

export const getStripe = () => stripePromise;

export default {
  getStripe
};
