import { useState } from 'react';
import Button from '../components/common/Button';

export default function ReportPet() {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Perro',
    breed:  '',
    color: '',
    size:  'Mediano',
    status: 'perdido',
    location: '',
    description:  '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e. target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Reporte enviado!');
    console.log('Datos del reporte:', formData);
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
          <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required>
            <option value="perdido">🔍 Perdido</option>
            <option value="encontrado">✅ Encontrado</option>
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
            <label className="block text-gray-700 font-semibold mb-2">Tamaño *</label>
            <select name="size" value={formData. size} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus: outline-none focus:ring-2 focus:ring-orange-500" required>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Ubicación *</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Ej: Parque Central, CDMX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Descripción *</label>
          <textarea name="description" value={formData. description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Contacto</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nombre *</label>
              <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus: ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Teléfono *</label>
              <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-orange-500" required />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full">Enviar Reporte</Button>
      </form>
    </div>
  );
}
