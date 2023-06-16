import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/layouts/Main.vue'
import Home from '@/views/pages/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
      path: '',
      component: Home
    }]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
