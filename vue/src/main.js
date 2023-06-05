import { createApp } from 'vue'
import store from './store'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
