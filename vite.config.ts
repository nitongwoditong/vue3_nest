import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetAttributify({}), presetUno()],
      rules: [
        [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}px` })],
        [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })],
      ]
    }),
  ], //注册插件
  server: {
    open: true, //启动服务后自动打开浏览器s
    port: 3001, //服务端口
    proxy: {
      '/api': {
        target:'http://localhost:3000/',
        changeOrigin:true,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" }, //设置别名
      { find: "views", replacement: "/src/views" },
      { find: "components", replacement: "/src/components" },
    ],
  },
});
