import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig((envConfig) => {
  const env = loadEnv(envConfig.mode, process.cwd());
  const config = {
    base: env.VITE_URL_BASE,
    plugins: [react()],
  };

  return config;
});
