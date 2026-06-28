<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { MapPin, BookOpen, ClipboardList, Bell, User } from 'lucide-vue-next'

const router = useRouter()

const menuItems = [
  { id: 'map', label: 'Mapa del Campus', icon: MapPin, route: '/map', img: '/assets/images/menu-mapa.png' },
  { id: 'advices', label: 'Consejos Académicos', icon: BookOpen, route: '/advices', img: '/assets/images/menu-consejos.png' },
  { id: 'procedures', label: 'Trámites', icon: ClipboardList, route: '/procedures', img: '/assets/images/menu-tramites.png' },
  { id: 'notices', label: 'Avisos y Eventos', icon: Bell, route: '/notices', img: '/assets/images/menu-avisos.png' },
  { id: 'profile', label: 'Mi Perfil', icon: User, route: '/profile', img: '/assets/images/menu-perfil.png' },
]

const imagesLoaded = ref<Record<string, boolean>>({})

function onImageError(id: string) {
  imagesLoaded.value[id] = false
}

function onImageLoad(id: string) {
  imagesLoaded.value[id] = true
}

function goTo(route: string) {
  router.push(route)
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
        class="bg-white border-2 border-slate-300 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all group"
      >
        <div class="bg-slate-50 border-b-2 border-slate-200 flex items-center justify-center py-10 px-6 relative overflow-hidden min-h-[140px]">
          <img
            v-show="imagesLoaded[item.id] !== false"
            :src="item.img"
            @load="onImageLoad(item.id)"
            @error="onImageError(item.id)"
            class="w-full h-full object-contain max-w-[100px] max-h-[100px]"
            :alt="item.label"
          />
          <component
            v-show="!imagesLoaded[item.id]"
            :is="item.icon"
            class="w-16 h-16 text-slate-400 group-hover:text-indigo-500 transition-colors"
          />
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
  </div>
</template>
