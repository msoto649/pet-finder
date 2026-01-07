const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createReward,
  updateRewardAmount,
  holdRewardPayment,
  releaseRewardPayment,
  cancelReward,
  getRewardByPet,
  getUserRewards
} = require('../controllers/rewardController');

// Todas las rutas requieren autenticación excepto getRewardByPet

// Crear recompensa
router.post('/', protect, createReward);

// Actualizar monto de recompensa
router.put('/:id', protect, updateRewardAmount);

// Retener pago
router.post('/:id/hold', protect, holdRewardPayment);

// Liberar pago al finder
router.post('/:id/release', protect, releaseRewardPayment);

// Cancelar recompensa
router.post('/:id/cancel', protect, cancelReward);

// Obtener recompensa por mascota (pública)
router.get('/pet/:petId', getRewardByPet);

// Obtener recompensas del usuario
router.get('/user', protect, getUserRewards);

module.exports = router;
