import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
        "/eventos": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/usuarios": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/tracks": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/discograficas": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/login": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/compras": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/descripciones_playlist": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/generos": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/metodos_pago": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/playlists": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/ubicaciones": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/ventas": { target: "http://127.0.0.1:5000", changeOrigin: true },
        "/auth": { target: "http://127.0.0.1:5000", changeOrigin: true }
      },
    },
  });
