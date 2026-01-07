import { useState, useEffect } from 'react';
import { getTransactionsByReward } from '../../services/rewardService';

export default function TransactionHistory({ rewardId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, [rewardId]);

  const loadTransactions = async () => {
    try {
      const response = await getTransactionsByReward(rewardId);
      setTransactions(response.data || []);
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Configuración de tipos
  const typeConfig = {
    payment: {
      label: 'Pago',
      icon: '💳',
      color: 'text-blue-700'
    },
    refund: {
      label: 'Reembolso',
      icon: '↩️',
      color: 'text-purple-700'
    },
    hold: {
      label: 'Retención',
      icon: '🔒',
      color: 'text-orange-700'
    },
    release: {
      label: 'Liberación',
      icon: '✅',
      color: 'text-green-700'
    }
  };

  // Configuración de estados
  const statusConfig = {
    pending: {
      label: 'Pendiente',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700'
    },
    completed: {
      label: 'Completado',
      bg: 'bg-green-100',
      text: 'text-green-700'
    },
    failed: {
      label: 'Fallido',
      bg: 'bg-red-100',
      text: 'text-red-700'
    },
    cancelled: {
      label: 'Cancelado',
      bg: 'bg-gray-100',
      text: 'text-gray-700'
    }
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-2">⏳</div>
          <p className="text-gray-600">Cargando historial...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📋 Historial de Transacciones
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-600">No hay transacciones registradas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        📋 Historial de Transacciones
      </h3>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const typeConf = typeConfig[transaction.type] || {};
          const statusConf = statusConfig[transaction.status] || statusConfig.pending;

          return (
            <div
              key={transaction._id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{typeConf.icon}</span>
                    <span className={`font-semibold ${typeConf.color}`}>
                      {typeConf.label}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusConf.bg} ${statusConf.text}`}>
                      {statusConf.label}
                    </span>
                  </div>

                  {transaction.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {transaction.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>📅 {formatDate(transaction.createdAt)}</span>
                    {transaction.from && (
                      <span>👤 De: {transaction.from.name}</span>
                    )}
                    {transaction.to && (
                      <span>👤 Para: {transaction.to.name}</span>
                    )}
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="text-xl font-bold text-gray-800">
                    {formatAmount(transaction.amount, transaction.currency)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.currency}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
