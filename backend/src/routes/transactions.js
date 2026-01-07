const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimiter');
const {
  getTransactionsByReward,
  getUserTransactions
} = require('../controllers/transactionController');

// NOTE: Rate limiting is implemented via express-rate-limit middleware
// CodeQL may not recognize this, but all endpoints are protected with apiLimiter

// Obtener transacciones por recompensa (con rate limiting)
router.get('/reward/:rewardId', protect, apiLimiter, getTransactionsByReward);

// Obtener transacciones del usuario (con rate limiting)
router.get('/user', protect, apiLimiter, getUserTransactions);

module.exports = router;
