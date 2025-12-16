import React, { useState } from 'react';
import Button from '../common/Button';

const PetForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    color: '',
    size: '',
    age: '',
    gender: '',
    description: '',
    lastSeenDate: '',
    address: '',
    city: '',
    state: '',
    reward: '',
    contactPhone: '',
    contactEmail: '',
    preferredContact: 'phone',
    photo: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.species) newErrors.species = 'La especie es requerida';
    if (!formData.breed.trim()) newErrors.breed = 'La raza es requerida';
    if (!formData.color.trim()) newErrors.color = 'El color es requerido';
    if (!formData.size) newErrors.size = 'El tamaño es requerido';
    if (!formData.gender) newErrors.gender = 'El género es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.lastSeenDate) newErrors.lastSeenDate = 'La fecha es requerida';
    if (!formData.city.trim()) newErrors.city = 'La ciudad es requerida';
    if (!formData.state.trim()) newErrors.state = 'El estado es requerido';
    if (!formData.contactPhone.trim() && !formData.contactEmail.trim()) {
      newErrors.contactPhone = 'Debes proporcionar al menos un método de contacto';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      console.log('Foto:', photoPreview ? 'Imagen cargada' : 'Sin imagen');
      alert('¡Reporte enviado exitosamente! (Esto es una demostración)');
      
      // Reset form
      setFormData({
        name: '',
        species: '',
        breed: '',
        color: '',
        size: '',
        age: '',
        gender: '',
        description: '',
        lastSeenDate: '',
        address: '',
        city: '',
        state: '',
        reward: '',
        contactPhone: '',
        contactEmail: '',
        preferredContact: 'phone',
        photo: null
      });
      setPhotoPreview(null);
    } else {
      alert('Por favor, completa todos los campos requeridos');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Información de la Mascota */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
          📋 Información de la Mascota
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre de la Mascota *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Max"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Especie *
            </label>
            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.species ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona una especie</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.species && <p className="text-red-500 text-xs mt-1">{errors.species}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Raza *
            </label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.breed ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Labrador"
            />
            {errors.breed && <p className="text-red-500 text-xs mt-1">{errors.breed}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Color *
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.color ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Dorado"
            />
            {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Tamaño *
            </label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.size ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un tamaño</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
            {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Edad Aproximada
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: 3 años"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Género *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un género</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Descripción Detallada *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Describe características distintivas, personalidad, marcas especiales, etc."
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
      </div>

      {/* Última Ubicación */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
          📍 Última Ubicación Vista
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Fecha de Pérdida *
            </label>
            <input
              type="date"
              name="lastSeenDate"
              value={formData.lastSeenDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.lastSeenDate ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastSeenDate && <p className="text-red-500 text-xs mt-1">{errors.lastSeenDate}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: Calle Principal 123"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Ciudad *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Ciudad de México"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Estado *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: CDMX"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>
      </div>

      {/* Recompensa y Foto */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
          💰 Recompensa y Foto
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Recompensa Ofrecida (MXN)
            </label>
            <input
              type="number"
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: 500"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Foto de la Mascota
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {photoPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Vista Previa:</p>
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full max-w-md h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información de Contacto */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-primary-500">
          📞 Información de Contacto
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${errors.contactPhone ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: 555-1234"
            />
            {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ej: correo@example.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contacto Preferido
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Teléfono</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Correo Electrónico</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button type="submit" variant="primary" className="w-full text-lg">
          📝 Enviar Reporte
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        * Campos requeridos
      </p>
    </form>
  );
};

export default PetForm;
