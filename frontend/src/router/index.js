import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import ChargerList from '../pages/ChargerList.vue'
import MapView from '../pages/MapView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/chargers', component: ChargerList },
  { path: '/map', name: 'Map', component: MapView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
