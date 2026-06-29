import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import RegisterPage from '../pages/RegisterPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import MainMenuPage from '../pages/MainMenuPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue';
import ResetPasswordPage from '../pages/ResetPasswordPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
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
    path: '/menu',
    component: MainMenuPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/characterization',
    component: { template: '<div>Formulario Caracterización Obligatoria</div>' },
    meta: { requiresAuth: true }
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage
  },
  {
    path: '/reset-password',
    component: ResetPasswordPage
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
