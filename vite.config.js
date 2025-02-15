import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      
    }
  },
  build:{
    outDir: './docs',
    base: 'BalloonBurst',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
})
