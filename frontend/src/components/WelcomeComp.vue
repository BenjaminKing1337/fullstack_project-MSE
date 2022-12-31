<template>
  <q-page class="flex flex-center" style="flex-direction: column">
    <img
      alt="MSE logo"
      src="../assets/logo.png"
      style="width: 200px; height: 200px"
    />
    <br />
    <q-btn v-if="!userAuth()" class="q-btn center" style="height: 48px; width: 126px;">
      <router-link class="navheader remove_linkStyle" to="/login">
        <q-item clickable tag="a" class="navitem">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label> <b> Login </b> </q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
    </q-btn>
    <q-btn v-if="superadminAuth()" class="q-btn center" style="height: 48px; width: 150px;">
      <q-item clickable tag="a" class="navitem" href="https://mse-a9ir.onrender.com/api/docs/">
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label> <b> Swagger </b> </q-item-label>
          </q-item-section>
        </q-item>
    </q-btn>
  </q-page>
</template>

<script>
export default {
  name: "WelcomeComp",
  props: {
    msg: String,
  },
  setup() {
    return {
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      superadminAuth() {
        return localStorage.getItem("level") === "superadmin";
      },
    };
  },
};
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
