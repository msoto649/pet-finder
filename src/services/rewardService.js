import api from './api';

/**
 * Crear una recompensa
 */
export const createReward = async (petId, data) => {
  const response = await api.post('/rewards', {
    petId,
    ...data
  });
  return response.data;
};

/**
 * Actualizar el monto de una recompensa
 */
export const updateReward = async (rewardId, data) => {
  const response = await api.put(`/rewards/${rewardId}`, data);
  return response.data;
};

/**
 * Retener pago cuando alguien reporta haber encontrado la mascota
 */
export const holdPayment = async (rewardId, finderId) => {
  const response = await api.post(`/rewards/${rewardId}/hold`, { finderId });
  return response.data;
};

/**
 * Liberar pago al finder cuando el dueño confirma
 */
export const releasePayment = async (rewardId) => {
  const response = await api.post(`/rewards/${rewardId}/release`);
  return response.data;
};

/**
 * Cancelar recompensa
 */
export const cancelReward = async (rewardId) => {
  const response = await api.post(`/rewards/${rewardId}/cancel`);
  return response.data;
};

/**
 * Obtener recompensa por ID de mascota
 */
export const getRewardByPet = async (petId) => {
  const response = await api.get(`/rewards/pet/${petId}`);
  return response.data;
};

/**
 * Obtener todas las recompensas del usuario
 */
export const getUserRewards = async () => {
  const response = await api.get('/rewards/user');
  return response.data;
};

/**
 * Obtener transacciones de una recompensa
 */
export const getTransactionsByReward = async (rewardId) => {
  const response = await api.get(`/transactions/reward/${rewardId}`);
  return response.data;
};

/**
 * Obtener transacciones del usuario
 */
export const getUserTransactions = async () => {
  const response = await api.get('/transactions/user');
  return response.data;
};
