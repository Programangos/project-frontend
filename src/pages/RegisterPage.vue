<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import RegisterFormView from '../views/RegisterFormView.vue'
import RegisterSuccessView from '../views/RegisterSuccessView.vue'
import RegisterErrorView from '../views/RegisterErrorView.vue'
import type { RegistrationForm } from '../types'

type Step = 'form' | 'success' | 'error'

const router = useRouter()
const authStore = useAuthStore()
const step = ref<Step>('form')
const formData = ref<RegistrationForm | null>(null)
const errorMessage = ref('')
const loading = ref(false)

function onFormSuccess(data: RegistrationForm) {
  formData.value = data
  step.value = 'success'
}

function goBackToForm() {
  step.value = 'form'
}

async function onAcceptAndContinue() {
  if (!formData.value) return
  loading.value = true
  try {
    const payload = {
      full_name: formData.value.fullName,
      email: `${formData.value.emailPrefix}@unal.edu.co`,
      password: formData.value.password,
      major: formData.value.major,
      current_semester: Number(formData.value.currentSemester),
    }
    await authStore.registerOnly(payload)
    router.push('/login')
  } catch (err: unknown) {
    const axiosErr = err as { response?: { data?: Record<string, string | string[]> } }
    const msg = axiosErr.response?.data
      ? Object.values(axiosErr.response.data).flat().join(', ')
      : 'Error de conexión con el servidor. Intenta de nuevo.'
    errorMessage.value = msg
    step.value = 'error'
  } finally {
    loading.value = false
  }
}

async function onRetry() {
  await onAcceptAndContinue()
}
</script>

<template>
  <RegisterFormView
      v-if="step === 'form'"
      @success="onFormSuccess"
    />
    <RegisterSuccessView
      v-else-if="step === 'success'"
      :form-data="formData"
      @back-to-form="goBackToForm"
      @accept-and-continue="onAcceptAndContinue"
    />
    <RegisterErrorView
      v-else-if="step === 'error'"
      :error-message="errorMessage"
      @back-to-form="goBackToForm"
      @retry="onRetry"
    />

    <!-- Loading overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 shadow-lg flex items-center gap-3">
        <div class="w-5 h-5 border-2 border-indigo-600 border-t-transparent animate-spin"></div>
        <span class="text-sm font-bold text-slate-700 font-mono">Registrando...</span>
      </div>
    </div>
</template>
