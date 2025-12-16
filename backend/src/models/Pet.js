const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  userId: {
    type: mongoose. Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    enum: ['Perro', 'Gato', 'Ave', 'Otro'],
    required: true
  },
  breed: String,
  color: String,
  size: {
    type: String,
    enum: ['Pequeño', 'Mediano', 'Grande']
  },
  age: String,
  gender: {
    type: String,
    enum: ['Macho', 'Hembra', 'Desconocido']
  },
  description: {
    type: String,
    required: true
  },
  photos: [String],
  lastSeenLocation: {
    address: String,
    city: String,
    state: String,
    latitude: Number,
    longitude: Number
  },
  lastSeenDate: {
    type: Date,
    required: true
  },
  reward: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum:  ['lost', 'found', 'reunited'],
    default: 'lost'
  },
  contactPhone: String,
  contactEmail: String,
  contactPreference: {
    type: String,
    enum: ['phone', 'email', 'both'],
    default: 'both'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema);
