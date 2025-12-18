import { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import PetList from '../components/pets/PetList';
import { getAllPets } from '../services/api';

export default function SearchPets() {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar mascotas del backend al montar el componente
  useEffect(() => {
    loadPets();
  }, []);

  const loadPets = async () => {
    try {
      setLoading(true);
      const response = await getAllPets();
      const petsData = response.data.data;
      setPets(petsData);
      setFilteredPets(petsData);
      setError(null);
    } catch (err) {
      console.error('Error cargando mascotas:', err);
      setError('Error al cargar las mascotas.  Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const filtered = pets. filter(pet =>
      pet. name. toLowerCase().includes(query.toLowerCase()) ||
      pet.breed.toLowerCase().includes(query.toLowerCase()) ||
      pet.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPets(filtered);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === 'todos') {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets.filter(pet => pet.status. toLowerCase() === status.toLowerCase()));
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando mascotas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadPets}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

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

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleStatusFilter('todos')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selectedStatus === 'todos'
              ? 'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
              ?  'bg-orange-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          ✅ Encontrados
        </button>
      </div>

      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No se encontraron mascotas</p>
        </div>
      ) : (
        <PetList pets={filteredPets} />
      )}
    </div>
  );
}