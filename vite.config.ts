import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import timeReporter from 'vite-plugin-time-reporter';

// https://vitejs.dev/config/

// We use a proxy here to avoid CORS issues.
// In simple terms, the proxy makes the server think that requests 
// from the Vite app are from the same origin.
// CORS is about restricting access, allowing only authorized users.
// This will be attached to the API.
export default defineConfig({
  plugins: [react(),
    timeReporter(),
  ],
  server:{
    proxy:{
      '/api':'https://stepper-3f76.onrender.com/',
    }
  }
})


