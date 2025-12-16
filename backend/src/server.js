const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Importar rutas
const petRoutes = require('./routes/petRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// Conectar a base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/pets', petRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente!  🚀' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
