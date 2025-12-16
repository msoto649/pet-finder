import api from './api';

export const petService = {
  getAllPets: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    const response = await api.get(`/pets?${params. toString()}`);
    return response.data;
  },

  getPetById: async (id) => {
    const response = await api.get(`/pets/${id}`);
    return response.data;
  },

  createPet: async (petData) => {
    const response = await api.post('/pets', petData);
    return response.data;
  },

  updatePet:  async (id, petData) => {
    const response = await api.put(`/pets/${id}`, petData);
    return response.data;
  },

  deletePet: async (id) => {
    const response = await api.delete(`/pets/${id}`);
    return response.data;
  },

  getMyPets: async () => {
    const response = await api.get('/pets/user/my-pets');
    return response.data;
  }
};
