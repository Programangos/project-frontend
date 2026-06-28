<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col mx-4">
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="font-medium text-gray-900">Documentos legales</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-700">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="flex gap-1 px-4 pt-3 border-b">
          <button @click="tab = 'terms'"
            :class="tab === 'terms' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'"
            class="text-sm font-medium pb-2 px-2">
            Términos de servicio
          </button>
          <button @click="tab = 'privacy'"
            :class="tab === 'privacy' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'"
            class="text-sm font-medium pb-2 px-2">
            Política de privacidad
          </button>
        </div>
        <div class="overflow-y-auto p-4 flex-1 text-sm text-gray-600 space-y-3">
          <TermsContent v-if="tab === 'terms'" />
          <PrivacyContent v-else />
        </div>
        <div class="p-4 border-t flex justify-end">
          <button @click="$emit('close')"
            class="bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700">
            Entendido
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import TermsContent from './TermsContent.vue'
import PrivacyContent from './PrivacyContent.vue'

const props = defineProps({
  isOpen: Boolean,
  initialTab: { type: String, default: 'terms' },
})
defineEmits(['close'])

const tab = ref(props.initialTab)
watch(() => props.isOpen, (val) => {
  if (val) tab.value = props.initialTab
})
</script>
