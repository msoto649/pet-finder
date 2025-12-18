const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Verificar si hay token en el header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autorizado, token no encontrado'
    });
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process. env.JWT_SECRET || 'tu_secreto_super_seguro_12345');

    // Agregar usuario a la petición
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    return res.status(401).json({
      success: false,
      message: 'No autorizado, token inválido'
    });
  }
};
