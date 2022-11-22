/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SuccessPage from '@/views/SuccessPage.vue'
import DeclinedPage from '@/views/DeclinedPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: "/success",
    name: "SuccessPage",
    component: SuccessPage,
  },
  {
    path: "/declined",
    name: "DeclinedPage",
    component: DeclinedPage,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
