<template>
  <div id="App">
    <nav style="display: flex; justify-content: space-between">
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/properties">Properties</router-link>
      </div>
      <div>
        [LOGO] <br> MSE Real Estate
      </div>
      <div>
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>