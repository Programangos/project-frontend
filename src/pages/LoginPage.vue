<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { Eye, EyeOff, MapPin, BookOpen, ClipboardList, Bell } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const emailPrefix = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const showError = ref(false)

function validateForm(): boolean {
  if (!emailPrefix.value.trim()) {
    errorMessage.value = 'El correo institucional es obligatorio.'
    showError.value = true
    return false
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(emailPrefix.value)) {
    errorMessage.value = 'Formato de correo inválido.'
    showError.value = true
    return false
  }
  if (!password.value) {
    errorMessage.value = 'La contraseña es obligatoria.'
    showError.value = true
    return false
  }
  return true
}

async function handleSubmit(e: Event) {
  e.preventDefault()
  showError.value = false
  if (!validateForm()) return
  loading.value = true
  try {
    const email = `${emailPrefix.value}@unal.edu.co`
    await authStore.loginUser(email, password.value)
    router.push('/menu')
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: Record<string, string | string[]> } }
    const msg = axiosErr.response?.data
      ? Object.values(axiosErr.response.data).flat().join(', ')
      : 'Error de conexión con el servidor.'
    errorMessage.value = msg
    showError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

    <!-- Left: Login Form -->
    <div class="lg:col-span-7 bg-white border-2 border-slate-200 shadow-sm flex flex-col">
      <div class="bg-slate-900 px-6 py-4">
        <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
          Iniciar sesión
        </h2>
      </div>

      <div class="p-6 sm:p-8">
        <!-- Error alert -->
        <Transition name="fade">
          <div v-if="showError"
            class="mb-6 bg-rose-50 border-2 border-rose-300 text-rose-800 px-5 py-4 flex items-start gap-3">
            <svg class="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm font-bold font-mono">{{ errorMessage }}</div>
          </div>
        </Transition>

        <form @submit="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Correo institucional
            </label>
            <div class="flex overflow-hidden">
              <input
                v-model="emailPrefix"
                placeholder="prefijo"
                class="w-full border-y-2 border-l-2 p-3 text-sm outline-none border-slate-100 bg-slate-50 focus:border-indigo-500 focus:bg-white text-slate-900 transition-colors"
              />
              <span class="inline-flex items-center px-4 border-2 border-l-0 border-slate-200 bg-slate-200 text-slate-700 text-xs font-bold uppercase select-none font-mono">
                @unal.edu.co
              </span>
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Ingresa tu contraseña"
                class="w-full border-2 border-slate-100 bg-slate-50 focus:border-indigo-500 focus:bg-white pl-3 pr-10 py-3 text-sm outline-none transition-colors text-slate-900"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3.5 p-1 text-slate-400 hover:text-slate-600 outline-none cursor-pointer"
              >
                <Eye v-if="showPassword" class="w-4 h-4" />
                <EyeOff v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="text-right -mt-3">
            <router-link
              to="/forgot-password"
              class="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 uppercase text-xs tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <div v-if="loading" class="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <div class="text-center pt-4">
            <router-link
              to="/register"
              class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 hover:underline transition-all"
            >
              ¿No tienes cuenta? Regístrate aquí.
            </router-link>
          </div>
        </form>
      </div>
    </div>

    <!-- Right: Logo -->
    <div class="lg:col-span-5 bg-white border-2 border-slate-200 shadow-sm flex flex-col">
      <div class="bg-slate-900 px-6 py-4">
        <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
          Sistema Integrado de Supervivencia Académica
        </h2>
      </div>
      <div class="flex-1 flex items-center justify-center p-8">
        <img
          src="/assets/images/logo.png"
          alt="SISA Logo"
          class="w-full max-w-sm h-auto object-contain"
        />
      </div>
    </div>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
