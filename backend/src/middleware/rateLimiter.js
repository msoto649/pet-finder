const rateLimit = require('express-rate-limit');

// Rate limiter for general API requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por ventana por IP
  message: {
    success: false,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter más estricto para operaciones de pago
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // límite de 10 requests por ventana por IP
  message: {
    success: false,
    message: 'Demasiadas operaciones de pago. Por favor intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para creación de recursos (prevenir spam)
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // límite de 20 creaciones por hora por IP
  message: {
    success: false,
    message: 'Límite de creaciones alcanzado. Por favor intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  apiLimiter,
  paymentLimiter,
  createLimiter
};
