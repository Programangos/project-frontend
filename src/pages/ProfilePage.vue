<script setup lang="ts">
import { User, Award, Star } from 'lucide-vue-next'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const user = authStore.user
</script>

<template>
  <div class="space-y-8" v-if="user">
    <div class="border-b-2 border-slate-200 pb-4">
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
        Mi Perfil
      </h1>
      <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
        Información y logros de tu cuenta SISA.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: User Info Card -->
      <div class="lg:col-span-1 bg-white border-2 border-slate-200 shadow-sm">
        <div class="bg-slate-900 px-6 py-4">
          <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
            Información
          </h2>
        </div>
        <div class="p-6 flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mb-4">
            <User class="w-12 h-12 text-slate-400" />
          </div>
          <h3 class="font-display font-black text-lg text-slate-900">{{ user.full_name }}</h3>
          <p class="text-sm text-slate-500 font-mono mt-1">{{ user.email }}</p>
          <div class="mt-4 w-full space-y-2 text-left">
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Carrera</span>
              <span class="text-sm font-semibold text-slate-900">{{ user.major }}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Semestre</span>
              <span class="text-sm font-semibold text-slate-900">{{ user.current_semester }}°</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Points & Achievements -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white border-2 border-slate-200 shadow-sm">
          <div class="bg-slate-900 px-6 py-4">
            <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
              <div class="flex items-center gap-2">
                <Star class="w-4 h-4" />
                Puntos de Reputación
              </div>
            </h2>
          </div>
          <div class="p-6">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center">
                <Award class="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <p class="text-3xl font-black text-slate-900 font-display">{{ user.reputation_points }}</p>
                <p class="text-xs text-slate-500 font-mono font-medium">Puntos acumulados</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white border-2 border-slate-200 shadow-sm">
          <div class="bg-slate-900 px-6 py-4">
            <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
              Logros
            </h2>
          </div>
          <div class="p-6">
            <p class="text-sm text-slate-400 font-mono text-center py-8">
              Próximamente — acumula puntos para desbloquear logros.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
