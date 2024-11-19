import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const settings = true;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react({})],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "remove-console-logs",
          transform(code) {
            if (settings) {
              return code.replace(/console\.(log|debug|info)\(.*\);?/g, "");
            }
            return code;
          },
        },
      ],
    },
  },
});
