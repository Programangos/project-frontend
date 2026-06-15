# SISA — Frontend

Frontend del proyecto SISA (Sistema de Supervivencia Académica), desarrollado con Vue 3, TypeScript, Pinia, Vue Router, Axios y Tailwind CSS.

## Requisitos

- Node.js 18+
- npm 9+

## Inicialización

Clona el repositorio e instala las dependencias:

```bash
npm install
```

Copia el archivo de entorno y ajusta la URL del backend si es necesario:

```bash
cp .env.example .env
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del proyecto

```
src/
├── components/       # Componentes UI reutilizables
├── views/            # Vistas por pantalla
├── pages/            # Páginas compuestas (agrupan vistas con layout)
├── router/           # Configuración de rutas y guardias de navegación
├── services/         # Llamadas HTTP a la API
├── stores/           # Estado global con Pinia
└── types/            # Interfaces y tipos TypeScript + constantes
```

## Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila para producción (vue-tsc + vite) |
| `npm run preview` | Vista previa de la build de producción |

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:8000/api` |
