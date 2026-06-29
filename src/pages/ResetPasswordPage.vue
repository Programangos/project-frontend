<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const route = useRoute()
const token = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const success = ref(false)
const errorMessage = ref('')

onMounted(() => {
  token.value = (route.query.token as string) || ''
  if (!token.value) {
    errorMessage.value = 'Enlace de recuperación inválido.'
  }
})

async function handleSubmit() {
  if (!token.value) {
    errorMessage.value = 'Enlace de recuperación inválido.'
    return
  }
  if (!password.value) {
    errorMessage.value = 'La contraseña es obligatoria.'
    return
  }
  if (password.value.length < 6) {
    errorMessage.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden.'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    await authService.resetPassword(token.value, password.value)
    success.value = true
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: { error?: string } } }
    errorMessage.value = axiosErr.response?.data?.error || 'Error al restablecer la contraseña.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <div class="lg:col-span-7 bg-white border-2 border-slate-200 shadow-sm flex flex-col">
      <div class="bg-slate-900 px-6 py-4">
        <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
          Restablecer contraseña
        </h2>
      </div>

      <div class="p-6 sm:p-8">
        <div v-if="errorMessage"
          class="mb-6 bg-rose-50 border-2 border-rose-300 text-rose-800 px-5 py-4 text-sm font-bold font-mono">
          {{ errorMessage }}
        </div>

        <div v-if="success" class="space-y-6">
          <div class="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 px-5 py-4 text-sm font-bold font-mono">
            Contraseña actualizada correctamente.
          </div>
          <button @click="router.push('/login')"
            class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
            Iniciar sesión
          </button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-700 mb-2 font-mono">
              Nueva contraseña
            </label>
            <input v-model="password" type="password" placeholder="••••••"
              class="w-full px-4 py-3 text-sm font-bold text-slate-900 outline-none border-2 border-slate-300 focus:border-indigo-500 transition-colors font-mono" />
          </div>

          <div>
            <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-700 mb-2 font-mono">
              Confirmar contraseña
            </label>
            <input v-model="confirmPassword" type="password" placeholder="••••••"
              class="w-full px-4 py-3 text-sm font-bold text-slate-900 outline-none border-2 border-slate-300 focus:border-indigo-500 transition-colors font-mono" />
          </div>

          <button type="submit" :disabled="loading || !token"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-xs tracking-widest uppercase py-4 transition-colors cursor-pointer">
            {{ loading ? 'Guardando...' : 'Restablecer contraseña' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
