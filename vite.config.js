import { defineConfig } from 'vite'
import fs from 'fs'


// https://vite.dev/config/
export default defineConfig({
  plugins: [],
   server: {
    https: {
      key: fs.readFileSync('./cert/key.pem'),
      cert: fs.readFileSync('./cert/cert.pem'),
    },
    port: 8080,
  },
})