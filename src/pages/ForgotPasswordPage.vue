<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService'

const router = useRouter()
const emailPrefix = ref('')
const loading = ref(false)
const sent = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  if (!emailPrefix.value.trim()) {
    errorMessage.value = 'El correo institucional es obligatorio.'
    return
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(emailPrefix.value)) {
    errorMessage.value = 'Formato de correo inválido.'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const email = `${emailPrefix.value}@unal.edu.co`
    await authService.forgotPassword(email)
    sent.value = true
  } catch {
    errorMessage.value = 'Error de conexión con el servidor.'
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
          Recuperar contraseña
        </h2>
      </div>

      <div class="p-6 sm:p-8">
        <div v-if="errorMessage"
          class="mb-6 bg-rose-50 border-2 border-rose-300 text-rose-800 px-5 py-4 text-sm font-bold font-mono">
          {{ errorMessage }}
        </div>

        <div v-if="sent" class="space-y-6">
          <div class="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 px-5 py-4 text-sm font-bold font-mono">
            Si el correo está registrado, recibirás un enlace de recuperación.
          </div>
          <button @click="router.push('/login')"
            class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors">
            Volver al inicio de sesión
          </button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-xs font-extrabold uppercase tracking-widest text-slate-700 mb-2 font-mono">
              Correo institucional
            </label>
            <div class="flex items-center border-2 border-slate-300 focus-within:border-indigo-500 transition-colors bg-white">
              <input v-model="emailPrefix" type="text" placeholder="correo"
                class="flex-1 px-4 py-3 text-sm font-bold text-slate-900 outline-none border-r-2 border-slate-300 font-mono" />
              <span class="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider select-none">@unal.edu.co</span>
            </div>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-extrabold text-xs tracking-widest uppercase py-4 transition-colors cursor-pointer">
            {{ loading ? 'Enviando...' : 'Enviar enlace de recuperación' }}
          </button>

          <button type="button" @click="router.push('/login')"
            class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
            Volver al inicio de sesión
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
