<script setup lang="ts">
import { XCircle, ArrowLeft, RefreshCw, LifeBuoy } from 'lucide-vue-next'

defineProps<{
  errorMessage: string
}>()

const emit = defineEmits<{
  (e: 'backToForm'): void
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="w-full">
    <!-- Breadcrumb -->
    <nav class="text-[11px] uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-1.5 font-bold px-1 select-none">
      <router-link to="/menu" class="hover:text-indigo-600 transition-colors">Inicio</router-link>
      <span>&rsaquo;</span>
      <span class="text-slate-900 font-extrabold font-mono">Error de Registro</span>
    </nav>

    <!-- Title -->
    <div class="mb-8 border-b-2 border-slate-200 pb-4">
      <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
        Solicitud de Registro No Completada
      </h1>
      <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
        Sistema Integrado de Supervivencia Académica.
      </p>
    </div>

    <!-- Two Column Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl">

      <!-- Left: Error details -->
      <div class="lg:col-span-7 bg-white border-2 border-slate-200 p-6 sm:p-8 shadow-sm">

        <div class="flex items-start gap-4">
          <div class="w-12 h-12 bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-400 flex-shrink-0">
            <XCircle class="w-7 h-7" />
          </div>
          <div>
            <h2 class="font-display font-black uppercase text-lg text-slate-900 tracking-tight">
              ¡Error al crear la cuenta!
            </h2>
            <p class="text-[11px] text-rose-600 font-bold uppercase tracking-wide mt-0.5 font-mono">No se pudo completar el registro</p>
          </div>
        </div>

        <div class="my-6 border-t-2 border-slate-100"></div>

        <div class="bg-slate-50 border-2 border-slate-100 p-5 mb-8">
          <h3 class="text-[10px] font-black uppercase tracking-widest text-rose-700 font-mono mb-2">
            Detalle del Error
          </h3>
          <p class="text-xs text-slate-700 leading-relaxed font-sans font-medium">
            {{ errorMessage || 'Ha ocurrido un error inesperado al procesar tu solicitud.' }}
          </p>
        </div>

        <!-- Action buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            @click="emit('retry')"
            class="px-6 py-4 bg-rose-600 hover:bg-rose-700 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors active:scale-[0.98]"
          >
            <RefreshCw class="w-3.5 h-3.5" />
            <span>Intentar de nuevo</span>
          </button>

          <button
            @click="emit('backToForm')"
            class="px-6 py-4 border-2 border-rose-600 text-rose-700 hover:bg-rose-50/40 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.98]"
          >
            <LifeBuoy class="w-3.5 h-3.5" />
            <span>Volver al registro</span>
          </button>
        </div>

        <div class="my-6 border-t-2 border-slate-100 font-mono"></div>

        <div class="text-left font-mono">
          <button
            @click="emit('backToForm')"
            class="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 transition-colors font-bold uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft class="w-3.5 h-3.5" />
            Volver al formulario de registro
          </button>
        </div>

      </div>

      <!-- Right: Image placeholder -->
      <div class="lg:col-span-5 flex flex-col items-center justify-center">
        <div class="bg-white border-2 border-slate-200 p-4 shadow-sm">
          <img
            src="/assets/images/error_registro.png"
            alt="Error de registro"
            class="w-full max-w-[340px] h-auto object-contain"
          />
        </div>
      </div>

    </div>
  </div>
</template>
