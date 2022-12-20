<template>
  <div id="app">
    <nav
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div>
        <router-link to="/"
          ><img src="@/assets/logo.png" style="width: 60px; height: 40px"
        /></router-link>
      </div>
      <div v-if="superadminAuth()">
        <router-link to="/customers">Customers</router-link>
      </div>
      <div v-if="adminAuth()">
        <router-link to="/buildings">Buildings</router-link>
      </div>
      <div v-if="adminAuth()">
        <router-link to="/properties">Properties</router-link>
      </div>
      <div v-if="adminAuth()">
        <router-link to="/tenants">Tenants</router-link>
      </div>
      <div v-if="adminAuth()">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="!userAuth() || superadminAuth()">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="userAuth()">
        <router-link to="/logout">Logout</router-link>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="userAuth()">
        Hello, <br />
        <b class="login-name">{{
          email.charAt(0).toUpperCase() + email.slice(1).split('@')[0]
        }}</b>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const email = ref('');
    return {
      userAuth() {
        email.value = localStorage.getItem('email');
        return (
          localStorage.getItem('Token') !== null &&
          localStorage.getItem('Token') !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem('level') === 'admin';
      },
      superadminAuth() {
        return localStorage.getItem('level') === 'superadmin';
      },
      email,
    };
  },
};
</script>

<style lang="scss" scoped></style>
