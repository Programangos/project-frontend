/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'lucide-vue-next' {
  import type { Component } from 'vue'
  export const ArrowLeft: Component
  export const ArrowRight: Component
  export const Bell: Component
  export const BookOpen: Component
  export const Calendar: Component
  export const Check: Component
  export const CheckCircle2: Component
  export const ChevronDown: Component
  export const ClipboardList: Component
  export const Eye: Component
  export const EyeOff: Component
  export const GraduationCap: Component
  export const HelpCircle: Component
  export const Leaf: Component
  export const LifeBuoy: Component
  export const Lightbulb: Component
  export const Mail: Component
  export const MapPin: Component
  export const RefreshCw: Component
  export const Search: Component
  export const Send: Component
  export const ThumbsUp: Component
  export const User: Component
  export const XCircle: Component
}
