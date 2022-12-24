import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
// Import user check that redirects to login
import AuthGuard from './auth-guard';
// Import user check that redirects to Landing page (if token null pass, if not go to "/")
import LoggedInGuard from './loggedin-guard';
// Import admin check
import AdminGuard from './admin-guard';
// Import user check for correct user when changing password
import PwdGuard from './pwd-guard';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/customers',
    name: 'customers',
    component: () => import('../views/CustomersView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/newcustomer',
    name: 'newcustomer',
    component: () => import('../views/CustomersCreateView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/customers/:id',
    name: 'customer',
    component: () => import('../views/CustomerView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/buildings',
    name: 'buildings',
    component: () => import('../views/BuildingsView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/newbuilding',
    name: 'newbuilding',
    component: () => import('../views/BuildingsCreateView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/buildings/:id',
    name: 'building',
    component: () => import('../views/BuildingView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/properties',
    name: 'properties',
    component: () => import('../views/PropertiesView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/newproperty',
    name: 'newproperty',
    component: () => import('../views/PropertiesCreateView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/properties/:id',
    name: 'property',
    component: () => import('../views/PropertyView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/tenants',
    name: 'tenants',
    component: () => import('../views/TenantsView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/newtenant',
    name: 'newtenant',
    component: () => import('../views/TenantsCreateView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/tenants/:id',
    name: 'tenant',
    component: () => import('../views/TenantView.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: () => import('../components/UsersCreateComp.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../components/UsersComp.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../components/UpdateUserComp.vue'),
    beforeEnter: AdminGuard,
  },
  {
    path: '/pwd/:id',
    name: 'change pwd',
    component: () => import('../components/UpdatePwdComp.vue'),
    beforeEnter: PwdGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/LoginComp.vue'),
    beforeEnter: LoggedInGuard,
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../components/LogoutComp.vue'),
    beforeEnter: AuthGuard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
