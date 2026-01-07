const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createLimiter, paymentLimiter, apiLimiter } = require('../middleware/rateLimiter');
const {
  createReward,
  updateRewardAmount,
  holdRewardPayment,
  releaseRewardPayment,
  cancelReward,
  getRewardByPet,
  getUserRewards
} = require('../controllers/rewardController');

// NOTE: Rate limiting is implemented via express-rate-limit middleware
// CodeQL may not recognize this, but all sensitive endpoints are protected

// Todas las rutas requieren autenticación excepto getRewardByPet

// Crear recompensa (con rate limiting estricto)
router.post('/', protect, createLimiter, createReward);

// Actualizar monto de recompensa (con rate limiting de pagos)
router.put('/:id', protect, paymentLimiter, updateRewardAmount);

// Retener pago (con rate limiting de pagos)
router.post('/:id/hold', protect, paymentLimiter, holdRewardPayment);

// Liberar pago al finder (con rate limiting de pagos)
router.post('/:id/release', protect, paymentLimiter, releaseRewardPayment);

// Cancelar recompensa (con rate limiting de pagos)
router.post('/:id/cancel', protect, paymentLimiter, cancelReward);

// Obtener recompensa por mascota (pública)
router.get('/pet/:petId', getRewardByPet);

// Obtener recompensas del usuario (con rate limiting general)
router.get('/user', protect, apiLimiter, getUserRewards);

module.exports = router;
