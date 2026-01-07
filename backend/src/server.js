const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Importar rutas
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/auth');
const rewardRoutes = require('./routes/rewards');
const transactionRoutes = require('./routes/transactions');
const { handleStripeWebhook } = require('./controllers/stripeWebhookController');

dotenv.config();

const app = express();

// Conectar a base de datos
connectDB();

// Webhook de Stripe (debe ir antes del middleware express.json())
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/transactions', transactionRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Pet Finder funcionando correctamente!   🚀',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API Docs:   http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth:  http://localhost:${PORT}/api/auth/login`);
});
