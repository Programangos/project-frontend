<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { authService } from '../services/authService'
import type { UserData } from '../types'
import { ArrowLeft, Trash2, User, Search } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

interface UserWithRole extends UserData {
  role: number | null
  role_name: string | null
}

const users = ref<UserWithRole[]>([])
const loading = ref(false)
const deletingId = ref<number | null>(null)

async function fetchUsers() {
  loading.value = true
  try {
    const response = await authService.getUsers()
    users.value = response.data
  } catch {
    users.value = []
  } finally {
    loading.value = false
  }
}

async function deleteUser(userId: number, userName: string) {
  if (!confirm(`¿Estás seguro de eliminar a "${userName}"? Se borrará todo su contenido asociado.`)) return
  deletingId.value = userId
  try {
    await authService.deleteUser(userId)
    users.value = users.value.filter(u => u.id !== userId)
  } catch {
    alert('Error al eliminar el usuario.')
  } finally {
    deletingId.value = null
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between border-b-2 border-slate-200 pb-4">
      <div>
        <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
          Usuarios
        </h1>
        <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
          Gestiona los usuarios registrados en la plataforma.
        </p>
      </div>
      <button
        @click="router.push('/menu')"
        class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Volver al Menú
      </button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <p class="text-sm text-slate-400 font-mono">Cargando usuarios...</p>
    </div>

    <div v-else-if="users.length === 0" class="text-center py-12 bg-white border-2 border-slate-200">
      <User class="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <p class="text-sm text-slate-500 font-mono">No hay usuarios registrados.</p>
    </div>

    <div v-else class="bg-white border-2 border-slate-200 shadow-sm overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="bg-slate-900 text-white text-[10px] uppercase tracking-widest font-bold">
            <th class="px-4 py-3">ID</th>
            <th class="px-4 py-3">Nombre</th>
            <th class="px-4 py-3">Correo</th>
            <th class="px-4 py-3">Carrera</th>
            <th class="px-4 py-3">Semestre</th>
            <th class="px-4 py-3">Rol</th>
            <th class="px-4 py-3">Puntos</th>
            <th class="px-4 py-3">Registro</th>
            <th class="px-4 py-3 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="u in users"
            :key="u.id"
            class="border-b border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ u.id }}</td>
            <td class="px-4 py-3 font-semibold text-slate-900">{{ u.full_name }}</td>
            <td class="px-4 py-3 font-mono text-xs text-slate-600">{{ u.email }}</td>
            <td class="px-4 py-3 text-slate-700">{{ u.major || '—' }}</td>
            <td class="px-4 py-3 text-slate-700">{{ u.current_semester ? u.current_semester + '°' : '—' }}</td>
            <td class="px-4 py-3">
              <span
                :class="[
                  'inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-1',
                  u.role_name === 'Administrador'
                    ? 'bg-indigo-100 text-indigo-800'
                    : u.role_name === 'special'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-600'
                ]"
              >
                {{ u.role_name || 'Sin rol' }}
              </span>
            </td>
            <td class="px-4 py-3 font-mono text-xs text-slate-500">{{ u.reputation_points }}</td>
            <td class="px-4 py-3 font-mono text-xs text-slate-400">{{ new Date(u.created_at).toLocaleDateString() }}</td>
            <td class="px-4 py-3 text-center">
              <button
                v-if="u.role_name !== 'Administrador'"
                @click="deleteUser(u.id, u.full_name)"
                :disabled="deletingId === u.id"
                class="text-rose-500 hover:text-rose-700 disabled:text-rose-300 transition-colors cursor-pointer"
                title="Eliminar usuario"
              >
                <Trash2 class="w-4 h-4 inline" />
              </button>
              <span v-else class="text-slate-300 text-[10px] font-mono">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
