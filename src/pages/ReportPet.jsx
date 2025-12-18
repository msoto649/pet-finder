import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { createPet } from '../services/api';

export default function ReportPet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name:  '',
    type: 'Perro',
    breed: '',
    color: '',
    age: '',
    gender:  'Macho',
    status: 'Perdido',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await createPet(formData);
      alert('¡Mascota reportada exitosamente!  🎉');
      navigate('/buscar');
    } catch (error) {
      console.error('Error al reportar mascota:', error);
      alert('Error al reportar la mascota.  Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Reportar Mascota</h1>
        <p className="text-gray-600 text-lg">
          Completa el formulario para reportar una mascota perdida o encontrada
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Estado *</label>
          <select name="status" value={formData. status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus: outline-none focus:ring-2 focus:ring-orange-500" required>
            <option value="Perdido">🔍 Perdido</option>
            <option value="Encontrado">✅ Encontrado</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Nombre de la Mascota *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tipo *</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus: ring-2 focus:ring-orange-500" required>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Raza *</label>
            <input type="text" name="breed" value={formData.breed} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Color *</label>
            <input type="text" name="color" value={formData. color} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus: outline-none focus:ring-2 focus:ring-orange-500" required />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Edad</label>
            <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Ej: 3 años" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Género *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Ubicación *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ej: San Salvador, Centro" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus: ring-2 focus:ring-orange-500" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descripción *</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe características especiales, comportamiento, etc." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus: ring-2 focus:ring-orange-500" required />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Contacto</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nombre *</label>
              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Teléfono *</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus: ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Reporte'}
        </Button>
      </form>
    </div>
  );
}