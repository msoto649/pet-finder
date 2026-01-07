import { Link } from 'react-router-dom';
import Button from '../common/Button';
import RewardBadge from '../rewards/RewardBadge';

export default function PetCard({ pet }) {
  const statusConfig = {
    perdido: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: '🔍'
    },
    encontrado:  {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: '✅'
    }
  };

  const config = statusConfig[pet.status.toLowerCase()];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
  src={pet.image || `https://source.unsplash.com/400x300/?${pet.type. toLowerCase()}`}
  alt={pet.name}
  className="w-full h-48 object-cover"
/>
        <div className={`absolute top-2 right-2 ${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1`}>
          <span>{config.icon}</span>
          <span className="capitalize">{pet.status}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pet.name}</h3>
        
        {/* Mostrar badge de recompensa si existe */}
        {pet.hasReward && pet.rewardAmount && (
          <div className="mb-3">
            <RewardBadge amount={pet.rewardAmount} currency={pet.rewardCurrency} />
          </div>
        )}
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p>🐾 {pet. type} - {pet.breed}</p>
          <p>🎨 {pet.color}</p>
          <p>📍 {pet.location}</p>
          <p>📅 {pet.date}</p>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {pet.description}
        </p>

        <Link to={`/mascota/${pet.id}`}>
          <Button className="w-full">
            Ver Detalles
          </Button>
        </Link>
      </div>
    </div>
  );
}
