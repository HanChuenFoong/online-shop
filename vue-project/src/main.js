import { createApp } from "vue";
import { createPinia } from "pinia";

import Vue from 'vue'
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

new Vue({
  render: h => h(App),
}).$mount('#app');