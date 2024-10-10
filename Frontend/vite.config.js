import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 
  server: {
        proxy: {
          // '/apiv1':"http://localhost:8080"
            // "/apiv1":"https://fanshoebackend.onrender.com"
            '/apiv1': {
                target:"https://fanshoebackend.onrender.com",
            //     changeOrigin: true,
            //     // target: 'http://localhost:8080', //or directly yu can write 'api':'http://locolhost:8080'
            //     // rewrite: (path) => path.replace(/^\/apiv1/, '')
            // }
        }
    },
    plugins: [react()],
    build: {
        rollupOptions: {
          external: ['@mui/material/input']
        }
      }
})
