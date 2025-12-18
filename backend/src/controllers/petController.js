const Pet = require('../models/Pet');

// Obtener todas las mascotas
exports.getAllPets = async (req, res) => {
  try {
    const { type, location, status } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (location) filter.location = new RegExp(location, 'i');
    if (status) filter.status = status;

    const pets = await Pet.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, count: pets.length, data: pets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener una mascota por ID
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    res.json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Crear nueva mascota
exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req. body);
    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Actualizar mascota
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    res.json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, message: error. message });
  }
};

// Eliminar mascota
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada' });
    }

    res.json({ success: true, message: 'Mascota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
