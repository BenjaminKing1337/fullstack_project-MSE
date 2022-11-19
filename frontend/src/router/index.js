import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/properties',
    name: 'properties',
    component: () => import('../views/PropertiesView.vue')
  },
  {
    path: "/properties/:id",
    name: "property",
    component: () => import("../views/PropertyView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComp.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/RegisterComp.vue"),
  },
  {
    path: "/edituser/:id",
    name: "edituser",
    component: () => import("../components/EditUser.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
