const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose. Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingresa tu nombre'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor ingresa tu email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
  },
  password:  {
    type: String,
    required: [true, 'Por favor ingresa tu contraseña'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false
  },
  createdAt: {
    type:  Date,
    default: Date. now
  }
});

// Encriptar contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
