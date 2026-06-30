declare module 'lucide-vue-next' {
  import { FunctionalComponent, SVGAttributes } from 'vue'
  interface LucideProps extends Partial<SVGAttributes> {
    size?: 24 | number
    strokeWidth?: number | string
    absoluteStrokeWidth?: boolean
  }
  type LucideIcon = FunctionalComponent<LucideProps>
  export const User: LucideIcon
  export const LogOut: LucideIcon
  export const Users: LucideIcon
  export const Trash2: LucideIcon
  export const ChevronDown: LucideIcon
  export const Award: LucideIcon
  export const Star: LucideIcon
  export const Pencil: LucideIcon
  export const ArrowLeft: LucideIcon
  export const Check: LucideIcon
  export const X: LucideIcon
  export const Search: LucideIcon
  export const MapPin: LucideIcon
  export const BookOpen: LucideIcon
  export const ClipboardList: LucideIcon
  export const Bell: LucideIcon
  export const Eye: LucideIcon
  export const EyeOff: LucideIcon
  export const CheckCircle2: LucideIcon
  export const ArrowRight: LucideIcon
  export const GraduationCap: LucideIcon
  export const Calendar: LucideIcon
  export const Mail: LucideIcon
  export const XCircle: LucideIcon
  export const RefreshCw: LucideIcon
  export const LifeBuoy: LucideIcon
  export const Heart: LucideIcon
  export const Share2: LucideIcon
  export const Plus: LucideIcon
  export const Crown: LucideIcon
  export const Calendar: LucideIcon
  export const Tag: LucideIcon
  export const Megaphone: LucideIcon
}
