<template>
  <q-page class="page" align="center">
    <br />
    <br />
    <div class="flex column flex-center">
      <img src="../assets/logo.png" style="width: 200px; height: 200px" />
      <h5 class="text-center">Are you sure you wanna leave?</h5>
      <div class="flex" style="flex-direction: column">
        <q-btn class="q-btn" @click="onLogout()">Confirm Log out</q-btn>
        <br />
        <q-btn class="q-btn" @click="onRegret()">Cancel</q-btn>
      </div>
    </div>
  </q-page>
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
      this.$router.push("/").then(() => {
        location.reload(true);
      });
    },
    onRegret() {
      this.$router.push("/");
    },
  },
};
</script>