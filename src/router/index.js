import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import MainMenuPage from '../pages/MainMenuPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';

const routes = [
  {
    path: '/',
    component: MainMenuPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/characterization',
    component: { template: '<div>Formulario Caracterización Obligatoria</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  }

  else if (authStore.isAuthenticated && authStore.needsCharacterization && to.path !== '/characterization') {
    next('/characterization');
  }
  else {
    next();
  }
});

export default router;
