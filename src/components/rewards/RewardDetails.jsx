import { useState } from 'react';
import Button from '../common/Button';
import { cancelReward, releasePayment } from '../../services/rewardService';

export default function RewardDetails({ reward, onUpdate, currentUserId }) {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(null);

  // Configuración de estado
  const statusConfig = {
    pending: {
      label: 'Pendiente',
      color: 'text-yellow-700',
      bg: 'bg-yellow-100',
      icon: '⏳'
    },
    held: {
      label: 'Retenido',
      color: 'text-orange-700',
      bg: 'bg-orange-100',
      icon: '🔒'
    },
    paid: {
      label: 'Pagado',
      color: 'text-green-700',
      bg: 'bg-green-100',
      icon: '✅'
    },
    cancelled: {
      label: 'Cancelado',
      color: 'text-gray-700',
      bg: 'bg-gray-100',
      icon: '❌'
    },
    refunded: {
      label: 'Reembolsado',
      color: 'text-blue-700',
      bg: 'bg-blue-100',
      icon: '↩️'
    }
  };

  const config = statusConfig[reward.status] || statusConfig.pending;

  // Formatear monto
  const formatAmount = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      MXN: '$'
    };
    return `${symbols[currency] || currency}${amount.toFixed(2)}`;
  };

  // Formatear fecha
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCancel = async () => {
    if (!showConfirm === 'cancel') {
      setShowConfirm('cancel');
      return;
    }

    setLoading(true);
    try {
      await cancelReward(reward._id);
      alert('Recompensa cancelada exitosamente');
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error al cancelar:', error);
      alert('Error al cancelar la recompensa');
    } finally {
      setLoading(false);
      setShowConfirm(null);
    }
  };

  const handleRelease = async () => {
    if (!showConfirm === 'release') {
      setShowConfirm('release');
      return;
    }

    setLoading(true);
    try {
      await releasePayment(reward._id);
      alert('Pago liberado exitosamente');
      onUpdate && onUpdate();
    } catch (error) {
      console.error('Error al liberar pago:', error);
      alert('Error al liberar el pago');
    } finally {
      setLoading(false);
      setShowConfirm(null);
    }
  };

  const isOwner = currentUserId && reward.owner && (reward.owner._id === currentUserId || reward.owner === currentUserId);
  const isFinder = currentUserId && reward.finder && (reward.finder._id === currentUserId || reward.finder === currentUserId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          💰 Recompensa
        </h3>
        <div className={`px-4 py-2 rounded-full ${config.bg} ${config.color} font-semibold flex items-center space-x-2`}>
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
          <span className="text-gray-700 font-semibold">Monto:</span>
          <span className="text-3xl font-bold text-orange-600">
            {formatAmount(reward.amount, reward.currency)}
          </span>
        </div>

        {reward.description && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Descripción:</span>
            <p className="text-gray-600 mt-1">{reward.description}</p>
          </div>
        )}

        {reward.owner && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Dueño:</span>
            <p className="text-gray-600 mt-1">
              {reward.owner.name || 'N/A'}
              {reward.owner.email && ` (${reward.owner.email})`}
            </p>
          </div>
        )}

        {reward.finder && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Encontrador:</span>
            <p className="text-gray-600 mt-1">
              {reward.finder.name || 'N/A'}
              {reward.finder.email && ` (${reward.finder.email})`}
            </p>
          </div>
        )}

        {reward.paidAt && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <span className="text-gray-700 font-semibold">Fecha de Pago:</span>
            <p className="text-gray-600 mt-1">{formatDate(reward.paidAt)}</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded-lg">
          <span className="text-gray-700 font-semibold">Creada:</span>
          <p className="text-gray-600 mt-1">{formatDate(reward.createdAt)}</p>
        </div>
      </div>

      {/* Acciones para el dueño */}
      {isOwner && (
        <div className="space-y-3 border-t pt-4">
          {reward.status === 'pending' && (
            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
            >
              {showConfirm === 'cancel' ? '¿Confirmar cancelación?' : 'Cancelar Recompensa'}
            </button>
          )}

          {reward.status === 'held' && (
            <div className="space-y-2">
              <button
                onClick={handleRelease}
                disabled={loading}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
              >
                {showConfirm === 'release' ? '¿Confirmar pago?' : 'Confirmar y Pagar al Encontrador'}
              </button>
              {showConfirm && (
                <button
                  onClick={() => setShowConfirm(null)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancelar Acción
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Información para el finder */}
      {isFinder && reward.status === 'held' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <p className="text-blue-800 font-semibold">
            🎉 El pago está retenido esperando confirmación del dueño
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Una vez que el dueño confirme la recuperación, recibirás el pago de la recompensa.
          </p>
        </div>
      )}

      {isFinder && reward.status === 'paid' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
          <p className="text-green-800 font-semibold">
            ✅ ¡Felicitaciones! Has recibido el pago de la recompensa
          </p>
        </div>
      )}
    </div>
  );
}
