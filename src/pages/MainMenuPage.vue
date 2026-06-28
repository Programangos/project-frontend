<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { MapPin, BookOpen, ClipboardList, Bell, User, LogOut } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const menuItems = [
  { id: 'map', label: 'Mapa del Campus', icon: MapPin, route: '/map' },
  { id: 'advices', label: 'Consejos Académicos', icon: BookOpen, route: '/advices' },
  { id: 'procedures', label: 'Trámites', icon: ClipboardList, route: '/procedures' },
  { id: 'notices', label: 'Avisos y Eventos', icon: Bell, route: '/notices' },
  { id: 'profile', label: 'Mi Perfil', icon: User, route: '/profile' },
]

function goTo(route: string) {
  router.push(route)
}

function handleLogout() {
  authStore.logoutUser()
  router.push('/login')
}
</script>

<template>
  <div class="space-y-8">
    <div class="border-b-2 border-slate-200 pb-4">
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
        Menú Principal
      </h1>
      <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
        Sistema Integrado de Supervivencia Académica.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in menuItems"
        :key="item.id"
        class="bg-white border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
      >
        <div class="bg-slate-50 border-b-2 border-slate-100 flex items-center justify-center py-10 px-6 group-hover:bg-indigo-50/50 transition-colors">
          <component :is="item.icon" class="w-16 h-16 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <div class="p-5">
          <h3 class="font-display font-black text-sm uppercase tracking-wider text-slate-900">
            {{ item.label }}
          </h3>
          <button
            @click="goTo(item.route)"
            class="mt-4 w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 uppercase text-xs tracking-widest transition-colors cursor-pointer active:scale-[0.98]"
          >
            Ir a {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="pt-4 border-t-2 border-slate-200">
      <button
        @click="handleLogout"
        class="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-10 uppercase text-xs tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
      >
        <LogOut class="w-4 h-4" />
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>
