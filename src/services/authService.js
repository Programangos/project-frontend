import apiClient from './apiClient';

export const authService = {
  register(userData) {
    return apiClient.post('/auth/register/', userData);
  },

  submitCharacterization(characterizationData) {
    return apiClient.post('/auth/characterization/', characterizationData);
  },

  login(email, password) {
    return apiClient.post('/auth/login/', { email, password });
  }
};
