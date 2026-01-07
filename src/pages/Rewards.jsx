import React, { useState } from 'react';
import RewardCard from '../components/pets/RewardCard';
import { mockPets } from '../data/mockPets';
import { rewardTiers, rewardHistory, topFinders } from '../data/rewardsData';

const Rewards = () => {
  const [activeTab, setActiveTab] = useState('activas');

  // Calculate statistics
  const activePets = mockPets.filter(pet => pet.status === 'lost');
  const totalActiveRewards = activePets.reduce((sum, pet) => sum + pet.reward, 0);
  const paidRewards = rewardHistory.filter(r => r.status === 'pagado');
  const totalPaidRewards = paidRewards.reduce((sum, r) => sum + r.rewardAmount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            💰 Sistema de Recompensas
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Incentivamos a la comunidad a ayudar en la búsqueda de mascotas perdidas. 
            Cada mascota reportada puede tener una recompensa que será entregada al encontrarla.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-3xl font-bold mb-1">
              ${totalActiveRewards.toLocaleString()}
            </div>
            <div className="text-primary-100 text-sm">Recompensas Activas</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">✅</div>
            <div className="text-3xl font-bold mb-1">
              ${totalPaidRewards.toLocaleString()}
            </div>
            <div className="text-green-100 text-sm">Recompensas Pagadas</div>
          </div>

          <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">🔍</div>
            <div className="text-3xl font-bold mb-1">
              {activePets.length}
            </div>
            <div className="text-secondary-100 text-sm">Mascotas con Recompensa</div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg shadow-lg p-6 text-white">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold mb-1">
              {topFinders.length}
            </div>
            <div className="text-amber-100 text-sm">Héroes Activos</div>
          </div>
        </div>

        {/* Reward Tiers Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🏆 Niveles de Recompensa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {rewardTiers.map((tier) => (
              <div
                key={tier.id}
                className={`border-2 ${tier.borderColor} rounded-lg p-4 text-center hover:shadow-lg transition-shadow`}
              >
                <div className="text-4xl mb-2">{tier.icon}</div>
                <h3 className={`text-xl font-bold ${tier.textColor} mb-2`}>
                  {tier.name}
                </h3>
                <div className="text-sm text-gray-600">
                  ${tier.minAmount.toLocaleString()} - 
                  {tier.maxAmount === Infinity ? '+' : ` $${tier.maxAmount.toLocaleString()}`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('activas')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'activas'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Recompensas Activas ({activePets.length})
            </button>
            <button
              onClick={() => setActiveTab('historial')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'historial'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Historial ({rewardHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'leaderboard'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Tabla de Líderes
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'activas' && (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Recompensas Disponibles
              </h2>
              <p className="text-gray-600">
                Estas mascotas están perdidas y sus dueños ofrecen una recompensa por encontrarlas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePets
                .filter(pet => pet.reward > 0)
                .sort((a, b) => b.reward - a.reward)
                .map((pet) => (
                  <RewardCard
                    key={pet.id}
                    reward={{
                      id: pet.id,
                      petId: pet.id,
                      petName: pet.name,
                      finderName: 'Buscando...',
                      rewardAmount: pet.reward,
                      location: `${pet.lastSeenLocation.city}, ${pet.lastSeenLocation.state}`,
                      status: 'pendiente'
                    }}
                    type="active"
                  />
                ))}
            </div>
          </div>
        )}

        {activeTab === 'historial' && (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Historial de Recompensas
              </h2>
              <p className="text-gray-600">
                Registro de todas las recompensas pagadas y pendientes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardHistory
                .sort((a, b) => {
                  if (a.status === 'pendiente' && b.status !== 'pendiente') return -1;
                  if (a.status !== 'pendiente' && b.status === 'pendiente') return 1;
                  return new Date(b.dateClaimed || 0) - new Date(a.dateClaimed || 0);
                })
                .map((reward) => (
                  <RewardCard key={reward.id} reward={reward} type="history" />
                ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                🌟 Héroes de la Comunidad
              </h2>
              <p className="text-gray-600">
                Personas que han ayudado a reunir mascotas con sus familias.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posición
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ciudad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mascotas Encontradas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Ganado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topFinders.map((finder, index) => (
                      <tr key={finder.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {index === 0 && <span className="text-2xl mr-2">🥇</span>}
                            {index === 1 && <span className="text-2xl mr-2">🥈</span>}
                            {index === 2 && <span className="text-2xl mr-2">🥉</span>}
                            <span className="text-lg font-bold text-gray-800">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">
                                {finder.avatar}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {finder.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{finder.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {finder.petsFound} mascotas
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-primary-600">
                            ${finder.totalRewards.toLocaleString()} MXN
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                ¿Quieres ser un héroe de la comunidad?
              </h3>
              <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
                Ayuda a encontrar mascotas perdidas y gana recompensas mientras haces una buena acción. 
                Cada mascota reunida con su familia es una historia de éxito.
              </p>
              <a
                href="/search"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Buscar Mascotas Ahora
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rewards;
