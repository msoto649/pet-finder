import React from 'react';
import PetForm from '../components/pets/PetForm';

const ReportPet = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Reportar Mascota Perdida
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Completa el siguiente formulario con la mayor cantidad de detalles posible. 
            Esto ayudará a la comunidad a identificar y localizar a tu mascota.
          </p>
          
          {/* Tips Card */}
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-lg text-left">
            <h3 className="font-bold text-primary-900 mb-2 flex items-center">
              <span className="mr-2">💡</span>
              Consejos importantes:
            </h3>
            <ul className="text-sm text-primary-800 space-y-1 ml-8 list-disc">
              <li>Proporciona fotos claras y recientes de tu mascota</li>
              <li>Incluye detalles distintivos (marcas, cicatrices, accesorios)</li>
              <li>Especifica la ubicación exacta donde se perdió</li>
              <li>Mantén tu información de contacto actualizada</li>
              <li>Revisa frecuentemente los reportes de mascotas encontradas</li>
            </ul>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
            <p className="text-secondary-900 text-lg font-medium">
              🌟 ¡No pierdas la esperanza! Cada día reunimos mascotas con sus familias gracias a nuestra comunidad activa.
            </p>
          </div>
        </div>

        {/* Form */}
        <PetForm />
      </div>
    </div>
  );
};

export default ReportPet;
