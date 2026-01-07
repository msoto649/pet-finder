import { useState, useEffect } from 'react';
import { getUserRewards } from '../services/rewardService';
import RewardBadge from '../components/rewards/RewardBadge';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

export default function MyRewards() {
  const [rewards, setRewards] = useState({ asOwner: [], asFinder: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('owner');

  useEffect(() => {
    loadRewards();
  }, []);

  const loadRewards = async () => {
    try {
      const response = await getUserRewards();
      setRewards(response.data || { asOwner: [], asFinder: [] });
    } catch (error) {
      console.error('Error al cargar recompensas:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      MXN: '$'
    };
    return `${symbols[currency] || currency}${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-800">Cargando recompensas...</h2>
        </div>
      </div>
    );
  }

  const displayRewards = activeTab === 'owner' ? rewards.asOwner : rewards.asFinder;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          💰 Mis Recompensas
        </h1>
        <p className="text-gray-600 text-lg">
          Administra las recompensas ofrecidas y recibidas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('owner')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'owner'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Recompensas Ofrecidas ({rewards.asOwner.length})
        </button>
        <button
          onClick={() => setActiveTab('finder')}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === 'finder'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Recompensas Ganadas ({rewards.asFinder.length})
        </button>
      </div>

      {/* Lista de recompensas */}
      {displayRewards.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No hay recompensas
          </h3>
          <p className="text-gray-600 mb-6">
            {activeTab === 'owner'
              ? 'Aún no has ofrecido ninguna recompensa'
              : 'Aún no has ganado ninguna recompensa'}
          </p>
          {activeTab === 'owner' && (
            <Link to="/reportar">
              <Button>Reportar Mascota con Recompensa</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {displayRewards.map((reward) => (
            <div
              key={reward._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Información de la mascota */}
                  {reward.pet && (
                    <div className="flex items-center space-x-4 mb-4">
                      {reward.pet.image && (
                        <img
                          src={reward.pet.image}
                          alt={reward.pet.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {reward.pet.name}
                        </h3>
                        <p className="text-gray-600">
                          {reward.pet.type} - {reward.pet.status}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Badge de recompensa */}
                  <div className="mb-3">
                    <RewardBadge
                      amount={reward.amount}
                      currency={reward.currency}
                      status={reward.status}
                    />
                  </div>

                  {/* Información adicional */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {activeTab === 'owner' && reward.finder && (
                      <p>
                        👤 Encontrador: {reward.finder.name}
                      </p>
                    )}
                    {activeTab === 'finder' && reward.owner && (
                      <p>
                        👤 Dueño: {reward.owner.name}
                      </p>
                    )}
                    <p>📅 Creada: {formatDate(reward.createdAt)}</p>
                    {reward.paidAt && (
                      <p>💳 Pagada: {formatDate(reward.paidAt)}</p>
                    )}
                  </div>
                </div>

                {/* Monto */}
                <div className="text-right ml-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {formatAmount(reward.amount, reward.currency)}
                  </div>
                  {reward.pet && (
                    <Link to={`/mascota/${reward.pet._id}`}>
                      <Button className="text-sm">Ver Detalles</Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
