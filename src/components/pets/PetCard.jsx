import React from 'react';
import Button from '../common/Button';

const PetCard = ({ pet }) => {
  const statusColors = {
    lost: 'bg-red-100 text-red-800 border-red-300',
    found: 'bg-green-100 text-green-800 border-green-300'
  };

  const statusLabels = {
    lost: 'Perdido',
    found: 'Encontrado'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Pet Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={pet.photos[0]}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[pet.status]}`}>
          {statusLabels[pet.status]}
        </div>
        {/* Reward Badge */}
        {pet.reward > 0 && (
          <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            💰 ${pet.reward}
          </div>
        )}
      </div>

      {/* Pet Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
        
        <div className="space-y-1 text-sm text-gray-600 mb-3">
          <p>
            <span className="font-semibold">Especie:</span> {pet.species} - {pet.breed}
          </p>
          <p>
            <span className="font-semibold">Color:</span> {pet.color}
          </p>
          <p>
            <span className="font-semibold">Tamaño:</span> {pet.size}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-start text-sm text-gray-600 mb-3">
          <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{pet.lastSeenLocation.city}, {pet.lastSeenLocation.state}</span>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 mb-4">
          Visto por última vez: {new Date(pet.lastSeenDate).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        {/* Button */}
        <Button 
          variant="primary" 
          className="w-full text-sm"
          onClick={() => console.log('Ver detalles de', pet.name)}
        >
          Ver Detalles
        </Button>
      </div>
    </div>
  );
};

export default PetCard;
