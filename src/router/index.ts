import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/layouts/Main.vue'
import Home from '@/views/pages/home/Home.vue'
import DetailMovie from '@/views/pages/detail/DetailMovie.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: 'movie/:id',
      name: 'movie-detail',
      component: DetailMovie
    }]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
