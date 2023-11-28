import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], //注册插件
  server: {
    open: true, //启动服务后自动打开浏览器
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" }, //设置别名
      { find: "views", replacement: "/src/views" },
      { find: "components", replacement: "/src/components" },
    ],
  },
});
