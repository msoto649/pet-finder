const stripe = require('../config/stripe');

class StripeService {
  /**
   * Crear un PaymentIntent en Stripe
   * @param {number} amount - Monto en centavos
   * @param {string} currency - Código de moneda (USD, EUR, etc.)
   * @param {string} customerId - ID del cliente en Stripe
   * @param {object} metadata - Datos adicionales
   * @returns {Promise<object>} - PaymentIntent creado
   */
  async createPaymentIntent(amount, currency = 'USD', customerId, metadata = {}) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convertir a centavos
        currency: currency.toLowerCase(),
        customer: customerId,
        capture_method: 'manual', // Pre-autorización, captura manual
        metadata: metadata,
        description: `Recompensa para mascota: ${metadata.petName || 'N/A'}`
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error al crear PaymentIntent:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Actualizar el monto de un PaymentIntent
   * @param {string} paymentIntentId - ID del PaymentIntent
   * @param {number} amount - Nuevo monto en centavos
   * @returns {Promise<object>} - PaymentIntent actualizado
   */
  async updatePaymentIntent(paymentIntentId, amount) {
    try {
      const paymentIntent = await stripe.paymentIntents.update(
        paymentIntentId,
        {
          amount: Math.round(amount * 100)
        }
      );

      return paymentIntent;
    } catch (error) {
      console.error('Error al actualizar PaymentIntent:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Capturar un PaymentIntent (retener el pago)
   * @param {string} paymentIntentId - ID del PaymentIntent
   * @returns {Promise<object>} - PaymentIntent capturado
   */
  async capturePaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error al capturar PaymentIntent:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Cancelar un PaymentIntent
   * @param {string} paymentIntentId - ID del PaymentIntent
   * @returns {Promise<object>} - PaymentIntent cancelado
   */
  async cancelPaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error al cancelar PaymentIntent:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Crear una transferencia a la cuenta del finder
   * @param {number} amount - Monto en centavos
   * @param {string} destinationAccountId - ID de cuenta Stripe del destinatario
   * @param {string} currency - Código de moneda
   * @returns {Promise<object>} - Transferencia creada
   */
  async createTransfer(amount, destinationAccountId, currency = 'USD') {
    try {
      const transfer = await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        destination: destinationAccountId
      });

      return transfer;
    } catch (error) {
      console.error('Error al crear transferencia:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Crear un cliente en Stripe
   * @param {string} email - Email del cliente
   * @param {string} name - Nombre del cliente
   * @returns {Promise<object>} - Cliente creado
   */
  async createCustomer(email, name) {
    try {
      const customer = await stripe.customers.create({
        email: email,
        name: name
      });

      return customer;
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Asociar un método de pago a un cliente
   * @param {string} customerId - ID del cliente
   * @param {string} paymentMethodId - ID del método de pago
   * @returns {Promise<object>} - Método de pago asociado
   */
  async attachPaymentMethod(customerId, paymentMethodId) {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(
        paymentMethodId,
        {
          customer: customerId
        }
      );

      // Establecer como método de pago predeterminado
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      });

      return paymentMethod;
    } catch (error) {
      console.error('Error al asociar método de pago:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Obtener métodos de pago de un cliente
   * @param {string} customerId - ID del cliente
   * @returns {Promise<array>} - Lista de métodos de pago
   */
  async getPaymentMethods(customerId) {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card'
      });

      return paymentMethods.data;
    } catch (error) {
      console.error('Error al obtener métodos de pago:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }

  /**
   * Crear un pago directo (con captura inmediata)
   * @param {number} amount - Monto en centavos
   * @param {string} currency - Código de moneda
   * @param {string} customerId - ID del cliente
   * @param {string} paymentMethodId - ID del método de pago
   * @returns {Promise<object>} - PaymentIntent confirmado
   */
  async createDirectPayment(amount, currency, customerId, paymentMethodId) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency.toLowerCase(),
        customer: customerId,
        payment_method: paymentMethodId,
        confirm: true,
        capture_method: 'automatic'
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error al crear pago directo:', error);
      throw new Error(`Error de Stripe: ${error.message}`);
    }
  }
}

module.exports = new StripeService();
