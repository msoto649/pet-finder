import React, { useState } from 'react';
import PetList from '../components/pets/PetList';
import { mockPets } from '../data/mockPets';

const SearchPets = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    species: '',
    location: '',
    status: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredPets = mockPets.filter(pet => {
    // Search term filter (name, breed, color)
    const searchLower = filters.searchTerm.toLowerCase();
    const matchesSearch = !filters.searchTerm || 
      pet.name.toLowerCase().includes(searchLower) ||
      pet.breed.toLowerCase().includes(searchLower) ||
      pet.color.toLowerCase().includes(searchLower);

    // Species filter
    const matchesSpecies = !filters.species || pet.species === filters.species;

    // Location filter (city or state)
    const locationLower = filters.location.toLowerCase();
    const matchesLocation = !filters.location ||
      pet.lastSeenLocation.city.toLowerCase().includes(locationLower) ||
      pet.lastSeenLocation.state.toLowerCase().includes(locationLower);

    // Status filter
    const matchesStatus = !filters.status || pet.status === filters.status;

    return matchesSearch && matchesSpecies && matchesLocation && matchesStatus;
  });

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      species: '',
      location: '',
      status: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Mascotas Perdidas
          </h1>
          <p className="text-gray-600">
            Busca entre {mockPets.length} mascotas reportadas. Si has visto alguna, contacta a sus dueños.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Filtros</h2>
              
              {/* Search Bar */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Buscar
                </label>
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Nombre, raza, color..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Species Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Especie
                </label>
                <select
                  name="species"
                  value={filters.species}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todas las especies</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ubicación
                </label>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="Ciudad o estado"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Status Filter */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="lost">Perdido</option>
                  <option value="found">Encontrado</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Limpiar Filtros
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-bold">{filteredPets.length}</span> resultado{filteredPets.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Pet List */}
            <PetList pets={filteredPets} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPets;
