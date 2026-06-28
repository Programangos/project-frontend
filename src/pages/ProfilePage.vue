<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { authService } from '../services/authService'
import { User, Award, Star, Pencil, ArrowLeft, Check, X } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const editing = ref(false)
const saving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const editMajor = ref('')
const editSemester = ref(0)

function startEditing() {
  if (!authStore.user) return
  editMajor.value = authStore.user.major || ''
  editSemester.value = authStore.user.current_semester || 0
  editing.value = true
  errorMessage.value = ''
  successMessage.value = ''
}

function cancelEditing() {
  editing.value = false
  errorMessage.value = ''
}

async function saveProfile() {
  if (!authStore.user) return
  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''
  try {
    const response = await authService.updateProfile(authStore.user.id, {
      major: editMajor.value,
      current_semester: editSemester.value,
    })
    authStore.user = response.data
    editing.value = false
    successMessage.value = 'Perfil actualizado correctamente.'
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: Record<string, string | string[]> } }
    errorMessage.value = axiosErr.response?.data
      ? Object.values(axiosErr.response.data).flat().join(', ')
      : 'Error al guardar los cambios.'
  } finally {
    saving.value = false
  }
}

function handleAvatarError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

function triggerFileInput() {
  document.getElementById('avatar-input')?.click()
}

async function handleFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !authStore.user) return

  const reader = new FileReader()
  reader.onload = async (event) => {
    const dataUrl = event.target?.result as string
    try {
      const response = await authService.updateProfile(authStore.user.id, {
        avatar_url: dataUrl,
      })
      authStore.user = response.data
      successMessage.value = 'Foto actualizada correctamente.'
    } catch {
      errorMessage.value = 'Error al actualizar la foto.'
    }
  }
  reader.readAsDataURL(file)
}

const user = computed(() => authStore.user)
</script>

<template>
  <div class="space-y-8" v-if="user">
    <!-- Header -->
    <div class="flex items-center justify-between border-b-2 border-slate-200 pb-4">
      <div>
        <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
          Mi Perfil
        </h1>
        <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
          Información y logros de tu cuenta SISA.
        </p>
      </div>
      <button
        @click="router.push('/')"
        class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Volver al Menú
      </button>
    </div>

    <!-- Alerts -->
    <div v-if="successMessage"
      class="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 px-5 py-4 text-sm font-bold font-mono"
    >
      {{ successMessage }}
    </div>
    <div v-if="errorMessage"
      class="bg-rose-50 border-2 border-rose-300 text-rose-800 px-5 py-4 text-sm font-bold font-mono"
    >
      {{ errorMessage }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left: Avatar + Info -->
      <div class="lg:col-span-1 bg-white border-2 border-slate-200 shadow-sm">
        <div class="bg-slate-900 px-6 py-4">
          <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
            Información
          </h2>
        </div>
        <div class="p-6 flex flex-col items-center text-center">
          <!-- Avatar -->
          <div class="relative group mb-4">
            <div class="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden">
              <img
                v-if="user.avatar_url"
                :src="user.avatar_url"
                @error="handleAvatarError"
                class="w-full h-full object-cover"
              />
              <User v-else class="w-12 h-12 text-slate-400" />
            </div>
            <button
              @click="triggerFileInput"
              class="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-colors cursor-pointer"
            >
              <Pencil class="w-3.5 h-3.5" />
            </button>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelected"
            />
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

      <!-- Right Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Edit Profile Section -->
        <div class="bg-white border-2 border-slate-200 shadow-sm">
          <div class="bg-slate-900 px-6 py-4 flex items-center justify-between">
            <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
              Editar Perfil
            </h2>
            <button
              v-if="!editing"
              @click="startEditing"
              class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300 hover:text-white transition-colors cursor-pointer"
            >
              <Pencil class="w-3 h-3" />
              Editar
            </button>
          </div>
          <div class="p-6">
            <template v-if="editing">
              <div class="space-y-4">
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                    Carrera
                  </label>
                  <input
                    v-model="editMajor"
                    class="w-full border-2 border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 transition-colors"
                    placeholder="Nombre de la carrera"
                  />
                </div>
                <div>
                  <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                    Semestre
                  </label>
                  <select
                    v-model.number="editSemester"
                    class="w-full border-2 border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 focus:bg-white text-slate-900 transition-colors bg-white"
                  >
                    <option v-for="s in 20" :key="s" :value="s">{{ s }}° Semestre</option>
                  </select>
                </div>
                <div class="flex items-center gap-3 pt-2">
                  <button
                    @click="saveProfile"
                    :disabled="saving"
                    class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Check class="w-3.5 h-3.5" />
                    {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
                  </button>
                  <button
                    @click="cancelEditing"
                    class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <X class="w-3.5 h-3.5" />
                    Cancelar
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <p class="text-sm text-slate-400 font-mono text-center py-4">
                Haz clic en "Editar" para modificar tu carrera y semestre.
              </p>
            </template>
          </div>
        </div>

        <!-- Reputation Points -->
        <div class="bg-white border-2 border-slate-200 shadow-sm">
          <div class="bg-slate-900 px-6 py-4">
            <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white flex items-center gap-2">
              <Star class="w-4 h-4" />
              Puntos de Reputación
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

        <!-- Achievements -->
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
