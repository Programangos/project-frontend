<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { User, LogOut, ChevronDown } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const showDropdown = ref(false)

function getEmailPrefix(email: string): string {
  return email.split('@')[0]
}

function handleLogout() {
  showDropdown.value = false
  authStore.logoutUser()
  router.push('/login')
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function closeDropdown() {
  showDropdown.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b-2 border-slate-200 px-6 py-3 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- Left: Brand Logo -->
      <router-link to="/" class="flex items-center gap-2">
        <img
          src="/assets/images/logom.png"
          alt="SISA"
          class="w-10 h-10 rounded-full object-cover"
        />
        <span class="font-display font-black text-2xl tracking-tighter text-slate-900">SISA</span>
      </router-link>

      <!-- Center: Nav Links -->
      <nav class="hidden md:flex items-center gap-6">
        <router-link to="/map" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Mapa</router-link>
        <router-link to="/notices" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Avisos</router-link>
        <router-link to="/advices" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Consejos</router-link>
        <router-link to="/procedures" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Trámites</router-link>
      </nav>

      <!-- Right: Profile / Login -->
      <div class="flex items-center gap-4">
        <template v-if="authStore.isAuthenticated && authStore.user">
          <div class="relative">
            <button
              @click="toggleDropdown"
              class="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 transition-colors rounded-sm cursor-pointer"
            >
              <div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                <img v-if="authStore.user.avatar_url" :src="authStore.user.avatar_url" class="w-full h-full object-cover" />
                <User v-else class="w-4 h-4 text-slate-500" />
              </div>
              <span class="text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:inline">
                {{ getEmailPrefix(authStore.user.email) }}
              </span>
              <ChevronDown class="w-3 h-3 text-slate-400" />
            </button>

            <div
              v-if="showDropdown"
              @click.self="closeDropdown"
              class="fixed inset-0 z-40"
            ></div>

            <Transition name="dropdown">
              <div
                v-if="showDropdown"
                class="absolute right-0 mt-2 w-56 bg-white border-2 border-slate-200 shadow-lg z-50"
              >
                <router-link
                  to="/profile"
                  @click="closeDropdown"
                  class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-wider"
                >
                  <User class="w-4 h-4" />
                  Mi Perfil
                </router-link>
                <hr class="border-t border-slate-100" />
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <LogOut class="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            </Transition>
          </div>
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Iniciar Sesión
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
