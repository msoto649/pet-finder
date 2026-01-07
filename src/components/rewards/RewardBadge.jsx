export default function RewardBadge({ amount, currency = 'USD', status = 'pending' }) {
  // Configuración de estilos por estado
  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300'
    },
    held: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-300'
    },
    paid: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300'
    },
    cancelled: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300'
    },
    refunded: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  // Formatear monto con símbolo de moneda
  const formatAmount = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      MXN: '$'
    };

    const symbol = symbols[currency] || currency + ' ';
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${config.bg} ${config.text} ${config.border} font-semibold text-sm`}>
      <span className="text-lg">💰</span>
      <span>{formatAmount(amount, currency)}</span>
      <span className="text-xs opacity-75">Recompensa</span>
    </div>
  );
}
