import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// Import user check that redirects to login
import AuthGuard from "./auth-guard";
// Import user check that redirects to Landing page (if token null pass, if not go to "/")
import LoggedInGuard from "./loggedin-guard";
// Import admin check
import AdminGuard from "./admin-guard";
// Import user check for correct user when changing password
import PwdGuard from "./pwd-guard";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/properties",
    name: "properties",
    component: () => import("../views/PropertiesView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/properties/:id",
    name: "property",
    component: () => import("../views/PropertyView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/tenants",
    name: "tenants",
    component: () => import("../views/TenantsView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/tenants/:id",
    name: "tenant",
    component: () => import("../views/TenantView.vue"),
    beforeEnter: AuthGuard,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/RegisterComp.vue"),
    // beforeEnter: LoggedInGuard,
  },
  {
    path: "/users/:id",
    name: "user",
    component: () => import("../components/UpdateUserComp.vue"),
    beforeEnter: AdminGuard,
  },
  {
    path: "/pwd/:id",
    name: "change pwd",
    component: () => import("../components/UpdatePwdComp.vue"),
    beforeEnter: PwdGuard,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/LoginComp.vue"),
    beforeEnter: LoggedInGuard,
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/LogoutComp.vue"),
    beforeEnter: AuthGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
