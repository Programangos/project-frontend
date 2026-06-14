import { defineStore } from 'pinia';
import { authService } from '../services/authService';

export const useAuthStore = defineStore('auth', {
  // 1. Estado: Variables que guardan los datos en memoria
  state: () => ({
    user: null,                                      // Datos del estudiante o administrador [cite: 26, 35]
    token: localStorage.getItem('sisa_token') || null, // Token de SimpleJWT
    loading: false,                                  // Estado de carga para deshabilitar botones
    error: null,                                     // Mensajes de error enviados por Django
    needsCharacterization: false                     // Bandera lógica para controlar el RF_02 
  }),

  // 2. Getters: Propiedades computadas basadas en el estado
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin' [cite: 35]
  },

  // 3. Acciones: Lógica de negocio del frontend que invoca al servicio
  actions: {
    // Lógica para RF_03 (Login) [cite: 38, 91]
    async loginUser(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(email, password);
        this.token = response.data.access;
        this.user = response.data.user;
        
        localStorage.setItem('sisa_token', this.token);
        
        // El backend debería retornar si el estudiante ya completó su caracterización 
        this.needsCharacterization = !response.data.user.is_characterized;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error en el inicio de sesión';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Lógica para RF_01 (Registro) [cite: 38, 88]
    async registerUser(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.register(userData);
        this.token = response.data.access;
        this.user = response.data.user;
        
        localStorage.setItem('sisa_token', this.token);
        this.needsCharacterization = true; // Todo usuario nuevo requiere caracterización inmediata 
      } catch (err) {
        this.error = err.response?.data || 'Error al intentar registrar el usuario';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Lógica para RF_02 (Caracterización) 
    async completeCharacterization(data) {
      this.loading = true;
      this.error = null;
      try {
        await authService.submitCharacterization(data);
        this.needsCharacterization = false; // Se marca como resuelto
        if (this.user) this.user.is_characterized = true;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al guardar la caracterización';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Lógica para RF_04 (Cerrar sesión manualmente) [cite: 40, 92]
    logoutUser() {
      this.user = null;
      this.token = null;
      this.needsCharacterization = false;
      this.error = null;
      localStorage.removeItem('sisa_token');
    }
  }
});