<template>
  <div id="app">
    <Nav />
  </div>
</template>

<style lang="scss">
</style>

<script>
import Nav from "./components/NavComp.vue";

export default {
  components: {
    Nav,
  },

  setup() {
    return {};
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: map-get($cs, highlight-active);
    }
  }
}
</style>
