<script setup lang="ts">
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b-2 border-slate-200 px-6 py-3 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- Left: Brand Logo -->
      <div class="flex items-center gap-2">
        <img
          src="/assets/images/logom.png"
          alt="SISA"
          class="w-10 h-10 rounded-full object-cover"
        />
        <span class="font-display font-black text-2xl tracking-tighter text-slate-900">SISA</span>
      </div>

      <!-- Center: Nav Links -->
      <nav class="hidden md:flex items-center gap-6">
        <a href="#" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Mapa</a>
        <a href="#" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Avisos</a>
        <a href="#" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Consejos</a>
        <a href="#" class="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider">Trámites</a>
      </nav>

      <!-- Right: empty for now (login link could go here) -->
      <div class="flex items-center gap-4">
        <router-link
          to="/login"
          class="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Iniciar Sesión
        </router-link>
      </div>
    </div>
  </header>
</template>
