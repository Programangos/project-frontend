<script setup lang="ts">
import { CheckCircle2, ArrowLeft, ArrowRight, GraduationCap, Calendar, User, Mail } from 'lucide-vue-next'
import type { RegistrationForm } from '../types'

const props = defineProps<{
  formData: RegistrationForm | null
}>()

const emit = defineEmits<{
  (e: 'backToForm'): void
  (e: 'acceptAndContinue'): void
}>()
</script>

<template>
  <div class="w-full">
    <!-- Breadcrumb -->
    <nav class="text-[11px] uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-1.5 font-bold px-1 select-none">
      <router-link to="/menu" class="hover:text-indigo-600 transition-colors">Inicio</router-link>
      <span>&rsaquo;</span>
      <span class="text-slate-900 font-extrabold font-mono">Registro Completado</span>
    </nav>

    <!-- Title -->
    <div class="mb-8 border-b-2 border-slate-200 pb-4">
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
        Solicitud de Registro Completada
      </h1>
      <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
        Sistema Integrado de Supervivencia Académica.
      </p>
    </div>

    <!-- Two column grid: Success card + Image -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl">

      <!-- Left: Success card -->
      <div class="lg:col-span-7 bg-white border-2 border-slate-200 shadow-sm">
        <div class="p-6 sm:p-8">
          <!-- Success banner -->
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <CheckCircle2 class="w-7 h-7" />
            </div>
            <div>
              <h2 class="font-display font-black uppercase text-lg text-slate-900 tracking-tight">
                ¡Solicitud creada con éxito!
              </h2>
              <p class="text-xs text-slate-500 mt-0.5 font-sans font-medium">El registro se completó correctamente en el sistema de la UNAL.</p>
            </div>
          </div>

          <div class="my-6 border-t-2 border-slate-100"></div>

          <!-- Data summary -->
          <div v-if="formData" class="bg-slate-50 border-2 border-slate-100 p-5 mb-6 space-y-3.5">
            <h3 class="text-[10px] font-black uppercase tracking-widest text-indigo-700 font-mono">
              Resumen de cuenta SISA
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center gap-2.5">
                <User class="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-[10px] uppercase font-bold text-slate-400 font-mono">Nombre</p>
                  <p class="text-xs font-semibold text-slate-900 truncate">{{ formData.fullName }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2.5">
                <Mail class="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-[10px] uppercase font-bold text-slate-400 font-mono">Correo</p>
                  <p class="text-xs font-semibold text-slate-900 truncate">{{ formData.emailPrefix }}@unal.edu.co</p>
                </div>
              </div>
              <div class="flex items-center gap-2.5">
                <GraduationCap class="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-[10px] uppercase font-bold text-slate-400 font-mono">Carrera</p>
                  <p class="text-xs font-semibold text-slate-900 truncate">{{ formData.major }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2.5">
                <Calendar class="w-4 h-4 text-indigo-600 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-[10px] uppercase font-bold text-slate-400 font-mono">Semestre</p>
                  <p class="text-xs font-semibold text-slate-900 truncate">{{ formData.currentSemester }}° Semestre</p>
                </div>
              </div>
            </div>
          </div>

          <!-- "Aceptar y Continuar" button -->
          <button
            @click="emit('acceptAndContinue')"
            class="w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors active:scale-[0.98]"
          >
            <span>Aceptar y Continuar</span>
            <ArrowRight class="w-3.5 h-3.5" />
          </button>

          <div class="my-6 border-t-2 border-slate-100"></div>

          <!-- Back link -->
          <div class="text-left font-mono">
            <button
              @click="emit('backToForm')"
              class="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 transition-colors font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowLeft class="w-3.5 h-3.5" />
              Volver al Formulario de Registro
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Image placeholder -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center">
        <div class="bg-white border-2 border-slate-200 p-4 shadow-sm">
          <img
            src="/assets/images/registro_exitoso.png"
            alt="Registro exitoso"
            class="w-full max-w-[340px] h-auto object-contain"
          />
        </div>
      </div>

    </div>
  </div>
</template>
