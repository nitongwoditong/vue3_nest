import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import store from './store'
import Antd from 'ant-design-vue';

createApp(App).use(Antd).use(router).use(store).mount('#app')
