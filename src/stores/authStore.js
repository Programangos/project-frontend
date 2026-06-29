import { defineStore } from 'pinia';
import { authService } from '../services/authService';
import { setAuthToken, clearAuthToken } from '../services/apiClient';

export const useAuthStore = defineStore('auth', {
  state: () => {
    const savedToken = localStorage.getItem('sisa_token');
    if (savedToken) setAuthToken(savedToken);
    return {
      user: null,
      token: savedToken,
      loading: false,
      needsCharacterization: false
    };
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role_name === 'Administrador'
  },

  actions: {
    async loginUser(email, password) {
      this.loading = true;
      const response = await authService.login(email, password);
      this.token = response.data.access;
      this.user = response.data.user;
      localStorage.setItem('sisa_token', this.token);
      setAuthToken(this.token);
      this.needsCharacterization = !response.data.user.is_characterized && response.data.user.role_name !== 'Administrador';
      this.loading = false;
    },

    async registerUser(userData) {
      this.loading = true;
      const response = await authService.register(userData);
      this.token = response.data.access;
      this.user = response.data.user;
      localStorage.setItem('sisa_token', this.token);
      setAuthToken(this.token);
      this.needsCharacterization = !response.data.user.is_characterized;
      this.loading = false;
    },

    async completeCharacterization(data) {
      this.loading = true;
      await authService.submitCharacterization(data);
      this.needsCharacterization = false;
      if (this.user) this.user.is_characterized = true;
      this.loading = false;
    },

    async registerOnly(userData) {
      return await authService.register(userData);
    },

    logoutUser() {
      this.user = null;
      this.token = null;
      this.needsCharacterization = false;
      localStorage.removeItem('sisa_token');
      clearAuthToken();
    }
  }
});
