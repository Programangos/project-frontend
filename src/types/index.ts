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
  { id: '1', name: 'Arquitectura' },
  { id: '2', name: 'Artes Plásticas' },
  { id: '3', name: 'Ciencia Política' },
  { id: '4', name: 'Contaduría Pública' },
  { id: '5', name: 'Derecho' },
  { id: '6', name: 'Diseño Gráfico' },
  { id: '7', name: 'Economía' },
  { id: '8', name: 'Enfermería' },
  { id: '9', name: 'Estadística' },
  { id: '10', name: 'Farmacia' },
  { id: '11', name: 'Filosofía' },
  { id: '12', name: 'Física' },
  { id: '13', name: 'Geografía' },
  { id: '14', name: 'Geología' },
  { id: '15', name: 'Historia' },
  { id: '16', name: 'Ingeniería Agrícola' },
  { id: '17', name: 'Ingeniería Ambiental' },
  { id: '18', name: 'Ingeniería Civil' },
  { id: '19', name: 'Ingeniería de Alimentos' },
  { id: '20', name: 'Ingeniería de Sistemas y Computación' },
  { id: '21', name: 'Ingeniería Eléctrica' },
  { id: '22', name: 'Ingeniería Electrónica' },
  { id: '23', name: 'Ingeniería Industrial' },
  { id: '24', name: 'Ingeniería Mecánica' },
  { id: '25', name: 'Ingeniería Mecatrónica' },
  { id: '26', name: 'Ingeniería Química' },
  { id: '27', name: 'Lenguas Extranjeras' },
  { id: '28', name: 'Matemáticas' },
  { id: '29', name: 'Medicina' },
  { id: '30', name: 'Medicina Veterinaria' },
  { id: '31', name: 'Microbiología' },
  { id: '32', name: 'Música' },
  { id: '33', name: 'Nutrición y Dietética' },
  { id: '34', name: 'Odontología' },
  { id: '35', name: 'Pedagogía' },
  { id: '36', name: 'Psicología' },
  { id: '37', name: 'Química' },
  { id: '38', name: 'Sociología' },
  { id: '39', name: 'Trabajo Social' },
  { id: '40', name: 'Zootecnia' },
]
