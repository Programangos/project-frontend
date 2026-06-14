import apiClient from './apiClient';

export const authService = {
  /**
   * RF_01: Registro de estudiante con datos institucionales [cite: 38, 88]
   * @param {Object} userData - { username, email, password, career, semester, terms } [cite: 38, 88]
   */
  register(userData) {
    return apiClient.post('/auth/register/', userData);
  },

  /**
   * RF_02: Formulario de caracterización inicial 
   * @param {Object} characterizationData - Respuestas sobre experiencia universitaria previa 
   */
  submitCharacterization(characterizationData) {
    return apiClient.post('/auth/characterization/', characterizationData);
  },

  /**
   * RF_03: Inicio de sesión con correo institucional [cite: 38, 91]
   * @param {string} email 
   * @param {string} password 
   */
  login(email, password) {
    return apiClient.post('/auth/login/', { email, password });
  }
};