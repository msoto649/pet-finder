import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../common/Button';

export default function RewardForm({ petId, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [formData, setFormData] = useState({
    amount: '',
    currency: 'USD',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe no está disponible');
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Ingresa un monto válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Crear método de pago con Stripe
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      // Aquí llamarías a tu API para crear la recompensa
      // con el paymentMethod.id
      const response = await fetch('http://localhost:5000/api/rewards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          petId,
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          description: formData.description,
          paymentMethodId: paymentMethod.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear recompensa');
      }

      // Si hay client_secret, confirmar el pago
      if (data.clientSecret) {
        const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
        
        if (confirmError) {
          setError(confirmError.message);
          setLoading(false);
          return;
        }
      }

      alert('¡Recompensa creada exitosamente! 🎉');
      onSuccess && onSuccess(data.data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Monto de la Recompensa *
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              step="0.01"
              placeholder="100.00"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="w-32">
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="MXN">MXN</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Descripción (Opcional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="2"
          maxLength="500"
          placeholder="Información adicional sobre la recompensa..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Método de Pago *
        </label>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Tu pago será pre-autorizado. No se cobrará hasta que confirmes la recuperación de tu mascota.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1"
        >
          {loading ? 'Procesando...' : 'Crear Recompensa'}
        </Button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
