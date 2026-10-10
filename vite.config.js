import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Mesmo valor no HTML pré-renderizado e no navegador (evita erro de hidratação na virada do ano)
    __ANO__: JSON.stringify(new Date().getFullYear()),
  },
})
