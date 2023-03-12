import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

Vue.use(vuetify)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  pinia,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
