import React from 'react';
import { getRewardTier } from '../../data/rewardsData';

const RewardCard = ({ reward }) => {
  const tier = getRewardTier(reward.rewardAmount);
  
  const statusColors = {
    pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    pagado: 'bg-green-100 text-green-800 border-green-300',
    cancelado: 'bg-red-100 text-red-800 border-red-300'
  };

  const statusLabels = {
    pendiente: 'Pendiente',
    pagado: 'Pagado',
    cancelado: 'Cancelado'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border-l-4" style={{ borderLeftColor: tier.bgColor.replace('bg-', '#') }}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${tier.bgColor} rounded-full flex items-center justify-center text-2xl`}>
            {tier.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{reward.petName}</h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${tier.textColor} bg-opacity-10`}>
              {tier.name}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">
            ${reward.rewardAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">MXN</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Encontrado por:</span>
          <span className="ml-2">{reward.finderName}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{reward.location}</span>
        </div>

        {reward.dateClaimed && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>Reclamado: {new Date(reward.dateClaimed).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[reward.status]}`}>
          {statusLabels[reward.status]}
        </span>
        
        {reward.status === 'pendiente' && (
          <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
            Ver detalles →
          </button>
        )}
      </div>
    </div>
  );
};

export default RewardCard;
