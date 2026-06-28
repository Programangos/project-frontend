<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'
import { User } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

function getEmailPrefix(email: string): string {
  return email.split('@')[0]
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

      <!-- Right: Profile or Login -->
      <div class="flex items-center gap-4">
        <template v-if="authStore.isAuthenticated && authStore.user">
          <router-link
            to="/profile"
            class="flex items-center gap-2 hover:bg-slate-50 px-3 py-2 transition-colors rounded-sm"
          >
            <div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
              <User class="w-4 h-4 text-slate-500" />
            </div>
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:inline">
              {{ getEmailPrefix(authStore.user.email) }}
            </span>
          </router-link>
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
