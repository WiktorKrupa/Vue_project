import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import Register from "@/views/Register.vue"
import Login from "@/views/Login.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }

]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
