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
  },

  updateProfile(userId, data) {
    return apiClient.patch(`/auth/profile/${userId}/`, data);
  },

  forgotPassword(email) {
    return apiClient.post('/auth/forgot-password/', { email });
  },

  resetPassword(token, password) {
    return apiClient.post('/auth/reset-password/', { token, password });
  },

  getUsers() {
    return apiClient.get('/admin/users/');
  },

  deleteUser(userId) {
    return apiClient.delete(`/admin/users/${userId}/`);
  }
};
