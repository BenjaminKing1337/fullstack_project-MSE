<template>
  <div id="App">
    <nav style="display: flex; justify-content: space-between">
      <div>
        <router-link to="/"
          ><img src="@/assets/logo.png" style="width: 50px; height: 50px"
        /></router-link>
      </div>
      <div v-if="userAuth()">
        <router-link to="/properties">Properties</router-link>
      </div>
      <div v-if="!userAuth()">
        <router-link to="/register">Register</router-link>
      </div>
      <div v-if="userAuth()">
        <router-link to="/logout">Logout</router-link>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>