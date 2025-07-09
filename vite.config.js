import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Importa el plugin específico de PostCSS para Tailwind
import tailwindcssPlugin from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcssPlugin(), // Llama al plugin específico de Tailwind
        autoprefixer(),
      ],
    },
  },
  base: '/mi-portafolio-vite/', // Asegúrate de que esta línea coincida con tu homepage en package.json
})
