<template>
  <div class="flex column flex-center">
    <img src="../assets/logo.png" style="width: 200px; height: 200px" />
    <h2 class="text-center">Are you sure you wanna leave?</h2>
    <div class="flex">
      <button @click="onLogout()">Yeah, see ya!</button>
      <button @click="onRegret()">No, lemme stay!</button>
    </div>
  </div>
</template>

<style lang="scss">
.router-link {
  text-decoration: none;
}
</style>

<script>
export default {
  methods: {
    onLogout() {
      localStorage.clear();
      this.$router.go("/");
      window.location.reload(true);
    },
    onRegret() {
      this.$router.push("/");
    },
  },
};
</script>