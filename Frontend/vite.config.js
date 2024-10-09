import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
 
  server: {
        proxy: {
            '/apiv1': {
                // target: 'http://localhost:8080', //or directly yu can write 'api':'http://locolhost:8080'
                target:"https://fanshoebackend.onrender.com",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/apiv1/, '')
            }
        }
    },
    plugins: [react()],
})
