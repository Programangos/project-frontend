export interface RegistrationForm {
  fullName: string
  emailPrefix: string
  password: string
  major: string
  currentSemester: number | ''
  acceptTerms: boolean
}

export interface ValidationErrors {
  fullName?: string
  emailPrefix?: string
  password?: string
  major?: string
  currentSemester?: string
  acceptTerms?: string
}

export interface UserData {
  id: number
  full_name: string
  email: string
  major: string
  avatar_url: string | null
  current_semester: number
  reputation_points: number
  created_at: string
  is_characterized: boolean
}

export interface CarreraOption {
  id: string
  name: string
}

export const API_TIMEOUT = 5000

export const MIN_NAME_LENGTH = 3

export const MIN_PASSWORD_LENGTH = 6

export const SEMESTRES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
} as const

export const CARRERAS_UNAL: CarreraOption[] = [
  { id: '1', name: 'Administración de Empresas' },
  { id: '2', name: 'Administración de Sistemas Informáticos' },
  { id: '3', name: 'Antropología' },
  { id: '4', name: 'Arquitectura' },
  { id: '5', name: 'Artes Plásticas' },
  { id: '6', name: 'Biología' },
  { id: '7', name: 'Ciencia Política' },
  { id: '8', name: 'Ciencias de la Computación' },
  { id: '9', name: 'Cine y Televisión' },
  { id: '10', name: 'Construcción' },
  { id: '11', name: 'Contaduría Pública' },
  { id: '12', name: 'Derecho' },
  { id: '13', name: 'Diseño Gráfico' },
  { id: '14', name: 'Diseño Industrial' },
  { id: '15', name: 'Economía' },
  { id: '16', name: 'Enfermería' },
  { id: '17', name: 'Español y Filología Clásica' },
  { id: '18', name: 'Estadística' },
  { id: '19', name: 'Estudios Literarios' },
  { id: '20', name: 'Farmacia' },
  { id: '21', name: 'Filología e Idiomas - Alemán' },
  { id: '22', name: 'Filología e Idiomas - Francés' },
  { id: '23', name: 'Filología e Idiomas - Inglés' },
  { id: '24', name: 'Filosofía' },
  { id: '25', name: 'Física' },
  { id: '26', name: 'Fisioterapia' },
  { id: '27', name: 'Fonoaudiología' },
  { id: '28', name: 'Geografía' },
  { id: '29', name: 'Geología' },
  { id: '30', name: 'Gestión Cultural y Comunicativa' },
  { id: '31', name: 'Historia' },
  { id: '32', name: 'Ingeniería Administrativa' },
  { id: '33', name: 'Ingeniería Agrícola' },
  { id: '34', name: 'Ingeniería Agroindustrial' },
  { id: '35', name: 'Ingeniería Agronómica' },
  { id: '36', name: 'Ingeniería Ambiental' },
  { id: '37', name: 'Ingeniería Biológica' },
  { id: '38', name: 'Ingeniería Civil' },
  { id: '39', name: 'Ingeniería de Control' },
  { id: '40', name: 'Ingeniería de Minas y Metalurgia' },
  { id: '41', name: 'Ingeniería de Petróleos' },
  { id: '42', name: 'Ingeniería de Sistemas e Informática' },
  { id: '43', name: 'Ingeniería de Sistemas y Computación' },
  { id: '44', name: 'Ingeniería Eléctrica' },
  { id: '45', name: 'Ingeniería Electrónica' },
  { id: '46', name: 'Ingeniería Física' },
  { id: '47', name: 'Ingeniería Forestal' },
  { id: '48', name: 'Ingeniería Geológica' },
  { id: '49', name: 'Ingeniería Industrial' },
  { id: '50', name: 'Ingeniería Mecánica' },
  { id: '51', name: 'Ingeniería Mecatrónica' },
  { id: '52', name: 'Ingeniería Química' },
  { id: '53', name: 'Lingüística' },
  { id: '54', name: 'Matemáticas' },
  { id: '55', name: 'Medicina' },
  { id: '56', name: 'Medicina Veterinaria' },
  { id: '57', name: 'Música' },
  { id: '58', name: 'Música Instrumental' },
  { id: '59', name: 'Nutrición y Dietética' },
  { id: '60', name: 'Odontología' },
  { id: '61', name: 'Psicología' },
  { id: '62', name: 'Química' },
  { id: '63', name: 'Sociología' },
  { id: '64', name: 'Terapia Ocupacional' },
  { id: '65', name: 'Trabajo Social' },
  { id: '66', name: 'Zootecnia' },
]
