const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, 'La mascota es requerida']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El dueño es requerido']
  },
  amount: {
    type: Number,
    required: [true, 'El monto es requerido'],
    min: [1, 'El monto debe ser mayor a 0']
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  status: {
    type: String,
    enum: ['pending', 'held', 'paid', 'cancelled', 'refunded'],
    default: 'pending'
  },
  finder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stripePaymentIntentId: {
    type: String
  },
  stripePaymentStatus: {
    type: String
  },
  paidAt: {
    type: Date
  },
  description: {
    type: String,
    maxlength: [500, 'La descripción no puede tener más de 500 caracteres']
  }
}, {
  timestamps: true
});

// Index para búsquedas rápidas
rewardSchema.index({ pet: 1 });
rewardSchema.index({ owner: 1 });
rewardSchema.index({ finder: 1 });
rewardSchema.index({ status: 1 });

module.exports = mongoose.model('Reward', rewardSchema);
