import axios from 'axios';

// Creamos la instancia apuntando al entorno local de tu backend en Django
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajusta el puerto si tu Django usa otro (ej: 8000)
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor: Antes de enviar cualquier petición HTTP al backend, 
// este fragmento revisa si el usuario tiene sesión activa y le inyecta el token JWT.
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sisa_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor: Si el backend responde con un error 401 (Token expirado o inválido),
// limpiamos automáticamente la sesión en el frontend.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('sisa_token');
      // Aquí se podría forzar un redireccionamiento lógico en el futuro
    }
    return Promise.reject(error);
  }
);

export default apiClient;