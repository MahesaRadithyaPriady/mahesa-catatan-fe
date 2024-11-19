import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({})],
  build: {
    rollupOptions: {
      plugins: [
        {
          name: "remove-console-logs",
          transform(code) {
            if (import.meta.env.VITE_NODE_ENV === "production") {
              return code.replace(/console\.(log|debug|info)\(.*\);?/g, "");
            }
            return code;
          },
        },
      ],
    },
  },
});
