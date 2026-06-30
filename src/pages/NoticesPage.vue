<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { noticeService } from '../services/noticeService'
import { HTTP_STATUS } from '../types'
import {
  ArrowLeft, Heart, Share2, Plus, Crown, User, X, Search, Megaphone, Trash2, Star
} from 'lucide-vue-next'
import type { UserData } from '../types'

const TODAY = new Date().toISOString().split('T')[0]
const DEFAULT_EXPIRY = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

interface NoticeData {
  id: number
  title: string
  description: string
  category: string
  is_official: boolean
  expiration_date: string | null
  user_id: number
  created_at: string
  user_full_name: string | null
  user_role_name: string | null
  like_count: number
  user_has_liked: boolean
}

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const notices = ref<NoticeData[]>([])
const loading = ref(false)
const showPublishForm = ref(false)
const showLoginPrompt = ref(false)
const loginPromptAction = ref<'like' | 'publish'>('like')
const showSearch = ref(false)
const searchQuery = ref('')
const likedNoticeIds = ref<Set<number>>(new Set())
const shareToast = ref('')
const focusedNoticeId = ref<number | null>(null)
const deletingId = ref<number | null>(null)

const publishForm = ref({
  title: '',
  description: '',
  category: 'Actividad del Campus',
  expiration_date: DEFAULT_EXPIRY
})

const formErrors = ref<{ title?: string; description?: string; expiration_date?: string }>({})

const categories = ['Manifestación', 'Evento Académico', 'Actividad del Campus']

async function fetchNotices() {
  loading.value = true
  try {
    const params: any = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (authStore.user) params.user_id = (authStore.user as UserData).id

    const resp = await noticeService.getNotices(params)

    if (focusedNoticeId.value) {
      const found = resp.data.find((n: NoticeData) => n.id === focusedNoticeId.value)
      notices.value = found ? [found] : []
    } else {
      notices.value = resp.data
    }

    likedNoticeIds.value = new Set(
      resp.data.filter((n: NoticeData) => n.user_has_liked).map((n: NoticeData) => n.id)
    )
  } catch {
    notices.value = []
  } finally {
    loading.value = false
  }
}

async function toggleLike(notice: NoticeData) {
  if (!authStore.user) {
    loginPromptAction.value = 'like'
    showLoginPrompt.value = true
    return
  }
  try {
    const resp = await noticeService.likeNotice(notice.id, (authStore.user as UserData).id)
    const nowLiked = resp.data && resp.data.liked !== false
    const s = new Set(likedNoticeIds.value)
    if (nowLiked) {
      s.add(notice.id)
      notice.like_count += 1
    } else {
      s.delete(notice.id)
      notice.like_count = Math.max(0, notice.like_count - 1)
    }
    likedNoticeIds.value = s
  } catch (err: any) {
    if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      authStore.logoutUser()
      loginPromptAction.value = 'like'
      showLoginPrompt.value = true
    }
  }
}

function onPublishClick() {
  if (!authStore.user) {
    loginPromptAction.value = 'publish'
    showLoginPrompt.value = true
    return
  }
  showPublishForm.value = !showPublishForm.value
}

function shareNotice(notice: NoticeData) {
  const url = `${window.location.origin}/notices?id=${notice.id}`
  navigator.clipboard.writeText(url)
  shareToast.value = '¡Enlace copiado al portapapeles!'
  setTimeout(() => { shareToast.value = '' }, 2500)
}

async function publishNotice() {
  formErrors.value = {}
  const errors: { title?: string; description?: string; expiration_date?: string } = {}

  if (!publishForm.value.title.trim()) {
    errors.title = 'El título es obligatorio.'
  }
  if (!publishForm.value.description.trim()) {
    errors.description = 'La descripción es obligatoria.'
  }
  if (publishForm.value.expiration_date && publishForm.value.expiration_date < TODAY) {
    errors.expiration_date = 'La fecha de expiración no puede ser anterior a hoy.'
  }

  if (Object.keys(errors).length > 0) {
    formErrors.value = errors
    return
  }

  try {
    await noticeService.createNotice({
      title: publishForm.value.title.trim(),
      description: publishForm.value.description.trim(),
      category: publishForm.value.category || 'Actividad del Campus',
      expiration_date: publishForm.value.expiration_date || null,
      user_id: (authStore.user as unknown as UserData).id
    })
    showPublishForm.value = false
    publishForm.value = { title: '', description: '', category: 'Actividad del Campus', expiration_date: DEFAULT_EXPIRY }
    formErrors.value = {}
    await fetchNotices()
  } catch (err: any) {
    if (err?.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      authStore.logoutUser()
      loginPromptAction.value = 'publish'
      showLoginPrompt.value = true
      showPublishForm.value = false
    }
  }
}

async function deleteNotice(notice: NoticeData) {
  if (!confirm(`¿Estás seguro de eliminar el aviso "${notice.title}"?`)) return
  if (!authStore.user) return
  deletingId.value = notice.id
  try {
    await noticeService.deleteNotice(notice.id, (authStore.user as UserData).id)
    notices.value = notices.value.filter(n => n.id !== notice.id)
  } catch {
    alert('Error al eliminar el aviso.')
  } finally {
    deletingId.value = null
  }
}

function canDelete(notice: NoticeData): boolean {
  if (!authStore.user) return false
  const uid = (authStore.user as UserData).id
  const role = (authStore.user as UserData).role_name
  return uid === notice.user_id || role === 'Administrador'
}

function searchNotices() {
  showSearch.value = false
  fetchNotices()
}

async function clearSearch() {
  searchQuery.value = ''
  showSearch.value = false
  focusedNoticeId.value = null
  await fetchNotices()
}

function clearFocus() {
  focusedNoticeId.value = null
  fetchNotices()
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function clearFieldError(field: 'title' | 'description' | 'expiration_date') {
  const errs = { ...formErrors.value }
  delete errs[field]
  formErrors.value = errs
}

onMounted(async () => {
  if (route.query.id) {
    focusedNoticeId.value = Number(route.query.id)
  }
  await fetchNotices()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-start justify-between border-b-2 border-slate-200 pb-4">
      <div>
        <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase tracking-tighter">
          Avisos y Eventos
        </h1>
        <p class="text-sm text-slate-500 mt-1 font-mono font-medium tracking-tight">
          Mantente informado sobre manifestaciones, eventos académicos y actividades del campus.
        </p>
      </div>
      <button
        @click="router.push('/menu')"
        class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors shrink-0"
      >
        <ArrowLeft class="w-3.5 h-3.5" />
        Volver al Menú
      </button>
    </div>

    <!-- Focused Notice Banner -->
    <div v-if="focusedNoticeId" class="bg-indigo-50 border border-indigo-200 rounded-xl px-6 py-3 flex items-center justify-between">
      <p class="text-sm text-indigo-700 font-medium">
        Mostrando aviso compartido.
      </p>
      <button
        @click="clearFocus"
        class="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider"
      >
        Ver todos
      </button>
    </div>

    <!-- Action Bar -->
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <button
          @click="onPublishClick"
          class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 uppercase text-xs tracking-widest transition-colors cursor-pointer rounded-lg"
        >
          <Plus class="w-4 h-4" />
          Publicar Aviso
        </button>
        <button
          @click="showSearch = !showSearch"
          class="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 px-4 uppercase text-xs tracking-widest transition-colors cursor-pointer rounded-lg"
        >
          <Search class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Search Bar -->
    <div v-if="showSearch" class="flex items-center gap-3">
      <input
        v-model="searchQuery"
        @keyup.enter="searchNotices"
        type="text"
        placeholder="Buscar avisos por palabra clave..."
        class="flex-1 border-2 border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 transition-colors rounded-lg"
      />
      <button
        @click="searchNotices"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors cursor-pointer rounded-lg"
      >
        Buscar
      </button>
      <button
        @click="clearSearch"
        class="text-xs font-bold text-slate-500 hover:text-slate-700 uppercase tracking-wider cursor-pointer"
      >
        Limpiar
      </button>
    </div>

    <!-- Image -->
    <div class="bg-gradient-to-r from-indigo-50 to-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center py-6 overflow-hidden">
      <img src="/assets/images/avisos.png" alt="Avisos" class="w-full h-auto max-h-72 object-contain" />
    </div>

    <!-- Publish Form -->
    <div v-if="showPublishForm" class="bg-white rounded-xl border-2 border-emerald-200 shadow-md p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-display font-black text-lg text-slate-900 uppercase tracking-tighter">
          Publicar Aviso
        </h2>
        <button @click="showPublishForm = false" class="text-slate-400 hover:text-slate-600 cursor-pointer">
          <X class="w-5 h-5" />
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Título *</label>
          <input
            v-model="publishForm.title"
            @input="clearFieldError('title')"
            type="text"
            maxlength="255"
            class="w-full border-2 p-3 text-sm outline-none transition-colors rounded-lg"
            :class="formErrors.title ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'"
            placeholder="Título del aviso"
          />
          <p v-if="formErrors.title" class="mt-1 text-xs text-red-500 font-medium">{{ formErrors.title }}</p>
        </div>
        <div>
          <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Descripción *</label>
          <textarea
            v-model="publishForm.description"
            @input="clearFieldError('description')"
            rows="4"
            class="w-full border-2 p-3 text-sm outline-none transition-colors resize-none rounded-lg"
            :class="formErrors.description ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'"
            placeholder="Describe tu aviso..."
          ></textarea>
          <p v-if="formErrors.description" class="mt-1 text-xs text-red-500 font-medium">{{ formErrors.description }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Categoría</label>
            <select
              v-model="publishForm.category"
              class="w-full border-2 border-slate-200 p-3 text-sm outline-none focus:border-indigo-500 transition-colors bg-white rounded-lg"
            >
              <option value="" disabled>Selecciona una categoría</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <p class="mt-1 text-[10px] text-slate-400 font-mono">Por defecto: Actividad del Campus</p>
          </div>
          <div>
            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Fecha de expiración</label>
            <input
              v-model="publishForm.expiration_date"
              @input="clearFieldError('expiration_date')"
              type="date"
              class="w-full border-2 p-3 text-sm outline-none transition-colors rounded-lg"
              :class="formErrors.expiration_date ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'"
            />
            <p v-if="formErrors.expiration_date" class="mt-1 text-xs text-red-500 font-medium">{{ formErrors.expiration_date }}</p>
            <p v-else class="mt-1 text-[10px] text-slate-400 font-mono">Por defecto: 30 días desde hoy</p>
          </div>
        </div>
        <div class="flex items-center gap-3 pt-2">
          <button
            @click="publishNotice"
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors cursor-pointer rounded-lg"
          >
            Publicar
          </button>
          <button
            @click="showPublishForm = false"
            class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors cursor-pointer rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>

    <!-- Share Toast -->
    <div
      v-if="shareToast"
      class="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg transition-all"
    >
      {{ shareToast }}
    </div>

    <!-- Login Prompt Overlay -->
    <div
      v-if="showLoginPrompt"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      @click.self="showLoginPrompt = false"
    >
      <div class="bg-white rounded-xl border border-slate-200 shadow-xl p-8 max-w-sm mx-4 text-center">
        <Heart v-if="loginPromptAction === 'like'" class="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <Megaphone v-else class="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h3 class="font-display font-black text-lg text-slate-900 uppercase tracking-tighter mb-2">
          Inicia Sesión
        </h3>
        <p class="text-sm text-slate-500 font-mono mb-6">
          <template v-if="loginPromptAction === 'like'">
            Para dar "Me gusta" debes iniciar sesión o registrarte en la plataforma.
          </template>
          <template v-else>
            Para publicar un aviso debes iniciar sesión o registrarte en la plataforma.
          </template>
        </p>
        <div class="flex items-center justify-center gap-3">
          <router-link
            to="/login"
            @click="showLoginPrompt = false"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors rounded-lg"
          >
            Iniciar Sesión
          </router-link>
          <router-link
            to="/register"
            @click="showLoginPrompt = false"
            class="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 uppercase text-xs tracking-widest transition-colors rounded-lg"
          >
            Registrarse
          </router-link>
        </div>
        <button
          @click="showLoginPrompt = false"
          class="mt-4 text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>

    <!-- Notice List -->
    <div v-if="loading" class="text-center py-12">
      <p class="text-sm text-slate-400 font-mono">Cargando avisos...</p>
    </div>

    <div v-else-if="notices.length === 0" class="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
      <Megaphone class="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <p class="text-sm text-slate-500 font-mono">No hay avisos publicados.</p>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="notice in notices"
        :key="notice.id"
        class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border-l-4"
        :class="notice.is_official ? 'border-l-amber-400 border border-amber-200' : 'border-l-indigo-400 border border-slate-200'"
      >
        <!-- Card Header -->
        <div class="flex items-center gap-3 px-6 pt-5 pb-2">
          <span v-if="notice.is_official"
            class="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
          >
            <Crown class="w-3 h-3" />
            Oficial
          </span>
          <span v-if="notice.user_role_name === 'Administrador'"
            class="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
          >
            Admin
          </span>
          <span v-if="notice.user_role_name === 'special'"
            class="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
          >
            <Star class="w-3 h-3" />
            Oficial
          </span>
          <span class="text-[11px] font-mono text-slate-400">{{ formatDate(notice.created_at) }}</span>
          <span class="text-[11px] font-mono text-slate-300">|</span>
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{{ notice.category }}</span>
        </div>

        <!-- Card Body -->
        <div class="px-6 pb-3">
          <h3 class="font-display font-black text-lg text-slate-900">{{ notice.title }}</h3>
          <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ notice.description }}</p>
        </div>

        <!-- Card Footer -->
        <div class="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <div class="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <User class="w-3 h-3" />
            {{ notice.user_full_name || 'Usuario' }}
          </div>
          <div class="flex items-center gap-4">
            <button
              @click="toggleLike(notice)"
              class="flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
              :class="likedNoticeIds.has(notice.id) ? 'text-rose-500 hover:text-rose-700' : 'text-slate-400 hover:text-slate-600'"
            >
              <Heart class="w-4 h-4" :class="likedNoticeIds.has(notice.id) ? 'fill-current' : ''" />
              {{ notice.like_count }}
            </button>
            <button
              @click="shareNotice(notice)"
              class="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
              title="Copiar enlace"
            >
              <Share2 class="w-4 h-4" />
              Compartir
            </button>
            <button
              v-if="canDelete(notice)"
              @click="deleteNotice(notice)"
              :disabled="deletingId === notice.id"
              class="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-600 transition-colors cursor-pointer disabled:text-rose-200"
              title="Eliminar aviso"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
