import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import Button from '../components/common/Button';
import RewardBadge from '../components/rewards/RewardBadge';
import RewardDetails from '../components/rewards/RewardDetails';
import TransactionHistory from '../components/rewards/TransactionHistory';
import { getPetById } from '../services/api';
import { getRewardByPet, holdPayment } from '../services/rewardService';
import { getStripe } from '../services/stripeService';

export default function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [reward, setReward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReportFound, setShowReportFound] = useState(false);
  
  // Obtener el usuario actual del localStorage (simulado)
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    loadPetDetails();
  }, [id]);

  const loadPetDetails = async () => {
    try {
      setLoading(true);
      // Cargar información de la mascota
      const petResponse = await getPetById(id);
      setPet(petResponse.data.data);

      // Si tiene recompensa, cargarla
      if (petResponse.data.data.hasReward) {
        try {
          const rewardResponse = await getRewardByPet(id);
          setReward(rewardResponse.data);
        } catch (error) {
          console.log('No se pudo cargar la recompensa:', error);
        }
      }
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReportFound = async () => {
    if (!currentUserId) {
      alert('Debes iniciar sesión para reportar que encontraste esta mascota');
      return;
    }

    if (!reward || reward.status !== 'pending') {
      alert('Esta recompensa no está disponible');
      return;
    }

    try {
      await holdPayment(reward._id, currentUserId);
      alert('¡Reporte enviado! El dueño será notificado. 🎉');
      loadPetDetails();
    } catch (error) {
      console.error('Error al reportar:', error);
      alert('Error al enviar el reporte');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-gray-600 text-lg">Cargando detalles...</p>
      </div>
    );
  }
  
  if (!pet) {
    return (
      <div className="text-center py-20">
        <div className="text-9xl mb-4">😿</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mascota no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Lo sentimos, no pudimos encontrar esta mascota.
        </p>
        <Link to="/buscar">
          <Button>Volver a Buscar</Button>
        </Link>
      </div>
    );
  }

  const statusConfig = {
    'Perdido': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: '🔍',
      label: 'Perdido'
    },
    'Encontrado': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✅',
      label: 'Encontrado'
    },
    'Reunido': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: '🎉',
      label: 'Reunido'
    }
  };

  const config = statusConfig[pet.status] || statusConfig['Perdido'];

  const isOwner = currentUserId && pet.owner && pet.owner.toString() === currentUserId;

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-orange-600 hover:text-orange-700 transition"
      >
        <span className="text-2xl mr-2">←</span>
        <span className="font-semibold">Volver</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
            <div className={`absolute top-4 right-4 ${config. bg} ${config.text} px-4 py-2 rounded-full font-semibold flex items-center space-x-2`}>
              <span>{config.icon}</span>
              <span>{config.label}</span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {pet.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              📍 {pet.location}
            </p>

            {/* Mostrar badge de recompensa */}
            {pet.hasReward && reward && (
              <div className="mb-6">
                <RewardBadge
                  amount={reward.amount}
                  currency={reward.currency}
                  status={reward.status}
                />
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Tipo:</span>
                <span className="text-gray-800">{pet. type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Raza:</span>
                <span className="text-gray-800">{pet.breed}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Color:</span>
                <span className="text-gray-800">{pet.color}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Tamaño: </span>
                <span className="text-gray-800">{pet.size}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 font-semibold w-32">Fecha:</span>
                <span className="text-gray-800">{pet.date}</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">
                {pet.description}
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">👤</span>
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-semibold text-gray-800">{pet.contactName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <a href={`tel:${pet.contactPhone}`} className="font-semibold text-orange-600 hover: text-orange-700">
                      {pet.contactPhone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✉️</span>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <a href={`mailto:${pet.contactEmail}`} className="font-semibold text-orange-600 hover:text-orange-700">
                      {pet.contactEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a href={`mailto:${pet.contactEmail}?subject=Consulta sobre ${pet.name}&body=Hola, vi tu publicación sobre ${pet.name}...`}>
                  <Button className="w-full">
                    Contactar por Email
                  </Button>
                </a>
              </div>
            </div>

            {/* Botón para reportar que encontró la mascota */}
            {!isOwner && pet.status === 'Perdido' && reward && reward.status === 'pending' && (
              <div className="mt-6">
                <button
                  onClick={handleReportFound}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  ✋ Reportar que Encontré esta Mascota
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Al reportar, el pago será retenido hasta que el dueño confirme
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección de Recompensa */}
      {reward && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RewardDetails
            reward={reward}
            onUpdate={loadPetDetails}
            currentUserId={currentUserId}
          />
          
          {/* Historial de transacciones */}
          <TransactionHistory rewardId={reward._id} />
        </div>
      )}
    </div>
  );
}
