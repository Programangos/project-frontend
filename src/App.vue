<script setup lang="ts">
import SisaHeader from './components/SisaHeader.vue'
import SisaFooter from './components/SisaFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <SisaHeader />
    <main class="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
      <router-view />
    </main>
    <SisaFooter />
  </div>
</template>
