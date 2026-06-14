<script setup lang="ts">
</script>

<template>
  <footer class="w-full bg-slate-900 text-xs text-slate-400 py-10 px-6 mt-12 border-t-4 border-slate-950 font-mono">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

      <!-- Left: SISA Portal Links + UNAL logo -->
      <div class="flex flex-col items-center md:items-start gap-3">
        <div class="flex flex-col items-center md:items-start gap-2">
          <span class="font-display font-black text-sm text-white uppercase tracking-wider">SISA Portal</span>
          <div class="flex flex-wrap gap-4 text-slate-500 text-xs">
            <a href="#" class="hover:text-indigo-400 text-slate-400 font-bold uppercase transition-colors text-[11px] tracking-wide">Sede Bogotá</a>
            <span class="text-slate-700 font-bold">|</span>
            <a href="#" class="hover:text-indigo-400 text-slate-400 font-bold uppercase transition-colors text-[11px] tracking-wide">Transparencia</a>
            <span class="text-slate-700 font-bold">|</span>
            <a href="#" class="hover:text-indigo-400 text-slate-400 font-bold uppercase transition-colors text-[11px] tracking-wide">Protección de Datos</a>
          </div>
        </div>
        <img
          src="/assets/images/unal.png"
          alt="UNAL"
          class="h-10 w-auto object-contain opacity-70"
        />
      </div>

      <!-- Right: University info -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2 border-l border-slate-800 pl-4 py-1 select-none">
          <div class="text-right">
            <p class="text-[10px] font-black tracking-widest text-indigo-400 leading-normal uppercase">UNIVERSIDAD</p>
            <p class="text-[10px] font-black tracking-widest text-white leading-normal uppercase">NACIONAL</p>
            <p class="text-[9px] text-slate-400 leading-none uppercase">DE COLOMBIA</p>
          </div>
        </div>
        <div class="text-slate-450 font-medium text-center md:text-right text-[11px] tracking-tight">
          <p class="text-slate-400 font-bold uppercase">&copy; Universidad Nacional de Colombia - SISA Portal</p>
          <p class="text-[10px] text-slate-500 mt-1 font-mono">Sistema Integrado de Supervivencia Académica. 2026</p>
        </div>
      </div>

    </div>
  </footer>
</template>
