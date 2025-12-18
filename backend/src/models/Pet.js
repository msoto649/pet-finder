const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  type:  {
    type: String,
    enum: ['Perro', 'Gato', 'Ave', 'Otro'],
    required: [true, 'El tipo de mascota es requerido']
  },
  breed: String,
  color: String,
  age: String,
  gender: {
    type:  String,
    enum: ['Macho', 'Hembra', 'Desconocido']
  },
  description:  {
    type: String,
    required: [true, 'La descripción es requerida']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300? text=Pet'
  },
  location: {
    type:  String,
    required: [true, 'La ubicación es requerida']
  },
  lastSeenDate: {
    type: Date,
    default:  Date.now
  },
  status: {
    type: String,
    enum: ['Perdido', 'Encontrado', 'Reunido'],
    default: 'Perdido'
  },
  contactName:  {
    type: String,
    required: [true, 'El nombre de contacto es requerido']
  },
  contactPhone: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  contactEmail: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
