import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import PetList from '../components/pets/PetList';
import { mockPets } from '../data/mockPets';

const Home = () => {
  // Get only the first 6 pets for the home page
  const recentPets = mockPets.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ayuda a reunir mascotas con sus familias 🐾
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-50">
              Una plataforma comunitaria dedicada a encontrar mascotas perdidas y reunirlas con sus seres queridos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button variant="secondary" className="w-full sm:w-auto text-lg">
                  🔍 Buscar Mascotas
                </Button>
              </Link>
              <Link to="/report">
                <Button variant="outline" className="w-full sm:w-auto text-lg bg-white hover:bg-primary-50 border-white">
                  📢 Reportar Mascota Perdida
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            ¿Cómo Funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">1. Reporta</h3>
              <p className="text-gray-600">
                Publica información detallada sobre tu mascota perdida con fotos y ubicación
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2. La Comunidad Ayuda</h3>
              <p className="text-gray-600">
                Nuestra comunidad busca activamente y comparte información sobre mascotas perdidas
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3. Reencuéntrate</h3>
              <p className="text-gray-600">
                Conecta con quienes han visto a tu mascota y reúnete con tu fiel compañero
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-5xl font-bold mb-2">{mockPets.length}</div>
              <p className="text-primary-100 text-lg">Mascotas Reportadas</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                {mockPets.filter(pet => pet.status === 'found').length}
              </div>
              <p className="text-primary-100 text-lg">Mascotas Encontradas</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1,200+</div>
              <p className="text-primary-100 text-lg">Usuarios Activos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Pets Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Últimas Mascotas Reportadas
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Estas mascotas necesitan tu ayuda para volver a casa. Si has visto alguna de ellas, 
            por favor contacta a sus dueños.
          </p>
          <PetList pets={recentPets} />
          <div className="text-center mt-12">
            <Link to="/search">
              <Button variant="primary" className="text-lg">
                Ver Todas las Mascotas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="text-6xl mb-6">💰</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sistema de Recompensas
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Gana recompensas ayudando a reunir mascotas con sus familias. 
              Cada mascota encontrada puede tener una recompensa económica para agradecerte.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  ${mockPets.filter(p => p.status === 'lost').reduce((sum, p) => sum + p.reward, 0).toLocaleString()}
                </div>
                <div className="text-amber-100">Recompensas Activas</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">
                  {mockPets.filter(p => p.reward > 0).length}
                </div>
                <div className="text-amber-100">Mascotas con Recompensa</div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6">
                <div className="text-4xl font-bold mb-2">$2,350</div>
                <div className="text-amber-100">Ya Pagadas</div>
              </div>
            </div>
            <Link to="/rewards">
              <Button variant="outline" className="text-lg bg-white hover:bg-amber-50 border-white text-amber-600">
                Ver Sistema de Recompensas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Perdiste a tu mascota?
          </h2>
          <p className="text-xl mb-8 text-secondary-50 max-w-2xl mx-auto">
            No pierdas tiempo. Reporta a tu mascota ahora y permite que la comunidad te ayude a encontrarla.
          </p>
          <Link to="/report">
            <Button variant="outline" className="text-lg bg-white hover:bg-secondary-50 border-white text-secondary-600">
              Reportar Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
