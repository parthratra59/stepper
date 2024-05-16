import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/

// We use a proxy here to avoid CORS issues.
// In simple terms, the proxy makes the server think that requests 
// from the Vite app are from the same origin.
// CORS is about restricting access, allowing only authorized users.
// This will be attached to the API.
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api':'http://localhost:3000',
    }
  }
})


