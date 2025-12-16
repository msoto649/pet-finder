const Pet = require('../models/Pet');

// Obtener todas las mascotas
exports.getAllPets = async (req, res) => {
  try {
    const { species, city, status } = req.query;
    
    let filter = {};
    if (species) filter.species = species;
    if (city) filter['lastSeenLocation.city'] = new RegExp(city, 'i');
    if (status) filter.status = status;

    const pets = await Pet.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: pets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener una mascota por ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('userId', 'name email phone');
    
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }
    
    res. json({ success: true, data:  pet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Crear nueva mascota perdida
exports.createPet = async (req, res) => {
  try {
    const petData = {
      ...req.body,
      userId: req.user.id, // Del middleware de autenticación
      photos: req.files ?  req.files.map(file => file.path) : []
    };

    const pet = await Pet.create(petData);
    
    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Actualizar mascota
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    // Verificar que el usuario sea el dueño
    if (pet. userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'No autorizado' });
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({ success: true, data: updatedPet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Eliminar mascota
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    
    if (!pet) {
      return res.status(404).json({ success: false, message:  'Mascota no encontrada' });
    }

    if (pet.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message:  'No autorizado' });
    }

    await pet.deleteOne();
    
    res.json({ success: true, message: 'Mascota eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
