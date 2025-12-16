import React from 'react';
import PetCard from './PetCard';

const PetList = ({ pets }) => {
  if (!pets || pets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🐾</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No se encontraron mascotas
        </h3>
        <p className="text-gray-500">
          Intenta ajustar tus filtros de búsqueda o revisa más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
