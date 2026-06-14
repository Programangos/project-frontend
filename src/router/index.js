import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

// Definición conceptual de rutas (los componentes pueden ser objetos vacíos por ahora)
const routes = [
  { 
    path: '/', 
    component: { template: '<div>Home - Mapa Interactivo</div>' }, // Temporal hasta hacer las vistas
    meta: { requiresAuth: true } 
  },
  { 
    path: '/login', 
    component: { template: '<div>Formulario Login</div>' } 
  },
  { 
    path: '/register', 
    component: { template: '<div>Formulario Registro</div>' } 
  },
  { 
    path: '/characterization', 
    component: { template: '<div>Formulario Caracterización Obligatoria</div>' }, 
    meta: { requiresAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardián de seguridad asíncrono
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Caso 1: Intenta entrar a una ruta protegida sin estar logueado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } 
  // Caso 2: Está logueado pero se salta la caracterización obligatoria (RF_02) 
  else if (authStore.isAuthenticated && authStore.needsCharacterization && to.path !== '/characterization') {
    next('/characterization');
  } 
  // Caso 3: Todo está en orden, permitir navegación
  else {
    next();
  }
});

export default router;