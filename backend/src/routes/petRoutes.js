const express = require('express');
const router = express.Router();
const { 
  getAllPets, 
  getPetById, 
  createPet, 
  updatePet, 
  deletePet 
} = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Rutas públicas
router.get('/', getAllPets);
router.get('/:id', getPetById);

// Rutas protegidas (requieren autenticación)
router.post('/', protect, upload.array('photos', 5), createPet);
router.put('/:id', protect, updatePet);
router.delete('/:id', protect, deletePet);

module.exports = router;
