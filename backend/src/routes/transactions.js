const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTransactionsByReward,
  getUserTransactions
} = require('../controllers/transactionController');

// Obtener transacciones por recompensa
router.get('/reward/:rewardId', protect, getTransactionsByReward);

// Obtener transacciones del usuario
router.get('/user', protect, getUserTransactions);

module.exports = router;
