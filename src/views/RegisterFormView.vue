<script setup lang="ts">
import { ref, computed } from 'vue'
import { Eye, EyeOff, Search, ChevronDown, Check, MapPin, BookOpen, ClipboardList, Bell } from 'lucide-vue-next'
import type { RegistrationForm, ValidationErrors, CarreraOption } from '../types'
import { CARRERAS_UNAL, SEMESTRES, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../types'

const emit = defineEmits<{
  (e: 'success', data: RegistrationForm): void
  (e: 'error', message: string): void
}>()

const form = ref<RegistrationForm>({
  fullName: '',
  emailPrefix: '',
  password: '',
  major: '',
  currentSemester: '',
  acceptTerms: false,
})

const showPassword = ref(false)
const carreraSearch = ref('')
const isCarreraDropdownOpen = ref(false)
const errors = ref<ValidationErrors>({})

const filteredCarreras = computed(() =>
  CARRERAS_UNAL.filter(c =>
    c.name.toLowerCase().includes(carreraSearch.value.toLowerCase())
  )
)

const semestres = SEMESTRES

function handleInputChange(e: Event) {
  const target = e.target as HTMLInputElement | HTMLSelectElement
  const { name, value, type } = target
  const val = type === 'checkbox' ? (target as HTMLInputElement).checked : value

  form.value = { ...form.value, [name]: val }

  if (errors.value[name as keyof ValidationErrors]) {
    errors.value = { ...errors.value, [name]: undefined }
  }
}

function handleCarreraSelect(carrera: CarreraOption) {
  form.value.major = carrera.name
  carreraSearch.value = ''
  isCarreraDropdownOpen.value = false
  if (errors.value.major) {
    errors.value = { ...errors.value, major: undefined }
  }
}

function validateForm(): boolean {
  const validationErrors: ValidationErrors = {}
  if (!form.value.fullName.trim()) validationErrors.fullName = 'El nombre completo es obligatorio.'
  else if (form.value.fullName.trim().length < MIN_NAME_LENGTH) validationErrors.fullName = `Debe tener al menos ${MIN_NAME_LENGTH} caracteres.`
  if (!form.value.emailPrefix.trim()) validationErrors.emailPrefix = 'El correo institucional es obligatorio.'
  else if (!/^[a-zA-Z0-9._-]+$/.test(form.value.emailPrefix)) validationErrors.emailPrefix = 'Formato de correo inválido.'
  if (!form.value.password) validationErrors.password = 'La contraseña es obligatoria.'
  else if (form.value.password.length < MIN_PASSWORD_LENGTH) validationErrors.password = `Debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`
  if (!form.value.major) validationErrors.major = 'Debes seleccionar tu carrera.'
  if (!form.value.currentSemester) validationErrors.currentSemester = 'Debes seleccionar tu semestre.'
  if (!form.value.acceptTerms) validationErrors.acceptTerms = 'Debes aceptar los términos y condiciones.'
  errors.value = validationErrors
  return Object.keys(validationErrors).length === 0
}

function handleSubmit(e: Event) {
  e.preventDefault()
  if (validateForm()) {
    emit('success', { ...form.value })
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Breadcrumb -->
    <nav class="text-[11px] uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-1.5 font-bold px-1 select-none">
      <router-link to="/" class="hover:text-indigo-600 transition-colors">Inicio</router-link>
      <span>&rsaquo;</span>
      <span class="text-slate-900 font-extrabold">Registro</span>
    </nav>

    <!-- Title -->
    <div class="mb-8 border-b-2 border-slate-200 pb-4">
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
        Crear cuenta en SISA
      </h1>
      <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
        Sistema Integrado de Supervivencia Académica.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      <!-- Left: Info section -->
      <div class="lg:col-span-4 bg-white border-2 border-slate-200 shadow-sm flex flex-col">
        <div class="bg-slate-900 px-6 py-4">
          <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
            Un visitante puede
          </h2>
        </div>
        <div class="p-6">
          <ul class="space-y-6">
            <li class="flex items-start gap-4">
              <div class="bg-indigo-50 p-2 border border-indigo-100 text-indigo-700 mt-0.5">
                <MapPin class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 tracking-tight">Visualizar el mapa interactivo</h3>
                <p class="text-xs text-slate-500 mt-0.5 font-medium">Explora el campus universitario.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div class="bg-slate-100 p-2 border border-slate-200 text-slate-800 mt-0.5">
                <Bell class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 tracking-tight">Ver los avisos publicados</h3>
                <p class="text-xs text-slate-500 mt-0.5 font-medium">Mantente al tanto de la comunidad.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div class="bg-[#eef2ff] p-2 border border-indigo-150 text-indigo-700 mt-0.5">
                <BookOpen class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 tracking-tight">Revisar consejos académicos</h3>
                <p class="text-xs text-slate-500 mt-0.5 font-medium">Obtén tutorías de estudiantes avanzados.</p>
              </div>
            </li>
            <li class="flex items-start gap-4">
              <div class="bg-slate-900/5 p-2 border border-slate-200 text-slate-800 mt-0.5">
                <ClipboardList class="w-4 h-4" />
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 tracking-tight">Explorar trámites universitarios</h3>
                <p class="text-xs text-slate-500 mt-0.5 font-medium">Conoce los procedimientos académicos.</p>
              </div>
            </li>
          </ul>

          <div class="my-6 border-t-2 border-slate-100"></div>

          <div class="text-center">
            <router-link
              to="/login"
              class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 hover:underline transition-all"
            >
              ¿Ya tienes cuenta? Inicia sesión aquí.
            </router-link>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="lg:col-span-8 bg-white border-2 border-slate-200 shadow-sm flex flex-col">
        <div class="bg-slate-900 px-6 py-4">
          <h2 class="font-display font-extrabold text-xs tracking-widest uppercase text-white">
            Registrar un nuevo usuario
          </h2>
        </div>

        <div class="p-6 sm:p-8">
          <form @submit="handleSubmit" class="space-y-6">

            <!-- Row: Full Name and Email -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div>
                <label for="fullName" class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  :value="form.fullName"
                  @input="handleInputChange"
                  placeholder="Ej. Daniel Parra"
                  :class="[
                    'w-full border-2 p-3 text-sm outline-none transition-colors',
                    errors.fullName
                      ? 'border-rose-400 bg-rose-50/30 text-rose-900'
                      : 'border-slate-100 bg-slate-50 focus:border-indigo-500 focus:bg-white text-slate-900'
                  ]"
                />
                <p v-if="errors.fullName" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.fullName }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="emailPrefix" class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Correo institucional
                </label>
                <div class="flex overflow-hidden">
                  <input
                    id="emailPrefix"
                    name="emailPrefix"
                    :value="form.emailPrefix"
                    @input="handleInputChange"
                    placeholder="prefijo"
                    :class="[
                      'w-full border-y-2 border-l-2 p-3 text-sm outline-none transition-colors',
                      errors.emailPrefix
                        ? 'border-rose-400 bg-rose-50/30 text-rose-900'
                        : 'border-slate-100 bg-slate-50 focus:border-indigo-500 focus:bg-white text-slate-900'
                    ]"
                  />
                  <span class="inline-flex items-center px-4 border-2 border-l-0 border-slate-200 bg-slate-200 text-slate-700 text-xs font-bold uppercase select-none font-mono">
                    @unal.edu.co
                  </span>
                </div>
                <p class="text-[10px] text-slate-400 mt-1.5 font-mono">Utiliza tu correo oficial de la universidad</p>
                <p v-if="errors.emailPrefix" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.emailPrefix }}</p>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  :value="form.password"
                  @input="handleInputChange"
                  placeholder="Mínimo 6 caracteres"
                  :class="[
                    'w-full border-2 pl-3 pr-10 py-3 text-sm outline-none transition-colors',
                    errors.password
                      ? 'border-rose-400 bg-rose-50/30 text-rose-900'
                      : 'border-slate-100 bg-slate-50 focus:border-indigo-500 focus:bg-white text-slate-900'
                  ]"
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
              <p v-if="errors.password" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.password }}</p>
            </div>

            <!-- Row: Major and Semester -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Major -->
              <div class="relative">
                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Carrera
                </label>
                <div
                  @click="isCarreraDropdownOpen = !isCarreraDropdownOpen"
                  :class="[
                    'w-full border-2 p-3 text-sm flex items-center justify-between cursor-pointer transition-colors',
                    errors.major
                      ? 'border-rose-400 bg-rose-50/30 text-rose-900'
                      : 'border-slate-100 bg-slate-50 text-slate-900'
                  ]"
                >
                  <span :class="form.major ? 'text-slate-900 font-semibold' : 'text-slate-400 font-medium'">
                    {{ form.major || 'Selecciona tu carrera' }}
                  </span>
                  <ChevronDown class="w-4 h-4 text-slate-400" />
                </div>

                <div v-if="isCarreraDropdownOpen" class="absolute left-0 right-0 mt-2 bg-white border-2 border-slate-900 shadow-md z-20 overflow-hidden">
                  <div class="p-2 border-b-2 border-slate-100 flex items-center gap-2 bg-slate-100">
                    <Search class="w-4 h-4 text-slate-500 ml-2" />
                    <input
                      type="text"
                      placeholder="Buscar carrera universitaria..."
                      v-model="carreraSearch"
                      @click.stop
                      class="w-full text-xs py-1.5 focus:outline-none placeholder-slate-400 text-slate-800 font-mono bg-transparent"
                    />
                  </div>
                  <div class="max-h-52 overflow-y-auto">
                    <div
                      v-for="c in filteredCarreras"
                      :key="c.id"
                      @click="handleCarreraSelect(c)"
                      :class="[
                        'px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-100 hover:text-indigo-900 transition-colors flex items-center justify-between cursor-pointer',
                        form.major === c.name ? 'bg-indigo-50 text-indigo-900 font-bold' : ''
                      ]"
                    >
                      <span>{{ c.name }}</span>
                      <Check v-if="form.major === c.name" class="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <p v-if="filteredCarreras.length === 0" class="px-4 py-3 text-xs text-slate-400 italic font-mono text-center">
                      No se encontraron carreras
                    </p>
                  </div>
                </div>
                <p v-if="errors.major" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.major }}</p>
              </div>

              <!-- Semester -->
              <div>
                <label for="currentSemester" class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Semestre
                </label>
                <div class="space-y-4">
                  <div class="relative">
                    <select
                      id="currentSemester"
                      name="currentSemester"
                      :value="form.currentSemester"
                      @change="handleInputChange"
                      :class="[
                        'w-full appearance-none border-2 p-3 text-sm outline-none bg-slate-50 transition-colors focus:border-indigo-500 focus:bg-white text-slate-900',
                        errors.currentSemester ? 'border-rose-400' : 'border-slate-100'
                      ]"
                    >
                      <option value="">Selecciona tu semestre académico</option>
                      <option v-for="s in semestres" :key="s" :value="s">{{ s }}</option>
                    </select>
                    <ChevronDown class="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div class="bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider py-2.5 px-4 flex items-center justify-between border-2 border-slate-200 select-none font-mono">
                    <span>Rango Académico SISA</span>
                    <span class="font-mono bg-indigo-600 text-white text-[10px] px-2 py-0.5 font-bold">
                      {{ form.currentSemester ? `Semestre ${form.currentSemester}` : '1 a 20' }}
                    </span>
                  </div>
                </div>
                <p v-if="errors.currentSemester" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.currentSemester }}</p>
              </div>
            </div>

            <!-- Terms -->
            <div class="bg-slate-50 p-4 border-2 border-slate-100 mt-8 space-y-4">
              <div class="text-xs leading-relaxed text-slate-600 font-sans font-medium">
                Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
                <a href="#" class="text-indigo-600 hover:underline font-bold">[Términos]</a>
                <a href="#" class="text-indigo-600 hover:underline font-bold ml-1">[Privacidad]</a>
              </div>
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  :checked="form.acceptTerms"
                  @change="handleInputChange"
                  class="mt-0.5 w-4 h-4 border-2 border-slate-300 text-indigo-600 focus:ring-slate-500"
                />
                <span class="text-xs font-bold text-slate-700 select-none uppercase tracking-wide">
                  Acepto los términos y condiciones.
                </span>
              </label>
              <p v-if="errors.acceptTerms" class="text-xs text-rose-600 font-bold mt-1 font-mono">{{ errors.acceptTerms }}</p>
            </div>

            <!-- Submit -->
            <div class="pt-4">
              <button
                type="submit"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 uppercase text-xs tracking-widest transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                Crear Cuenta
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>
