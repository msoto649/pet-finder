import { useState } from 'react';
import SearchBar from '../components/common/SearchBar';
import PetList from '../components/pets/PetList';
import { mockPets } from '../data/mockPets';

export default function SearchPets() {
  const [filteredPets, setFilteredPets] = useState(mockPets);
  const [selectedStatus, setSelectedStatus] = useState('todos');

  const handleSearch = (query) => {
    const filtered = mockPets.filter(pet => 
      pet.name.toLowerCase().includes(query.toLowerCase()) ||
      pet.breed.toLowerCase().includes(query.toLowerCase()) ||
      pet.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === 'todos') {
      setFilteredPets(mockPets);
    } else {
      setFilteredPets(mockPets.filter(pet => pet.status === status));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Buscar Mascotas
        </h1>
        <p className="text-gray-600 text-lg">
          Encuentra mascotas perdidas o reporta que encontraste una
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {/* Filters */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleStatusFilter('todos')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedStatus === 'todos'
              ? 'bg-orange-600 text-white'
              :  'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => handleStatusFilter('perdido')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedStatus === 'perdido'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          🔍 Perdidos
        </button>
        <button
          onClick={() => handleStatusFilter('encontrado')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedStatus === 'encontrado'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          ✅ Encontrados
        </button>
      </div>

      <PetList pets={filteredPets} />
    </div>
  );
}
