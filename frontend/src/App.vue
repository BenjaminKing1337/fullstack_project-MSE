<template>
  <q-layout id="app" view="lHh Lpr lFf">
    <q-header elevated class="toolbar glossy">
      <q-toolbar>
        <q-btn
          class="q-btn"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Main Solution Estates </q-toolbar-title>

        <div v-if="userAuth()">
          Hello,
          <b class="login-name">{{
            email.charAt(0).toUpperCase() + email.slice(1).split("@")[0]
          }}</b>
          <!-- Logout  -->
          <router-link
            v-if="userAuth()"
            class="navelement remove_linkStyle"
            to="/logout"
          >
            <q-icon
              style="font-size: 20px; margin-left: 10px"
              color="red"
              name="logout"
            />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <Nav />
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import Nav from "./components/NavComp.vue";

export default {
  name: "LayoutDefault",

  components: {
    Nav,
  },

  setup() {
    const email = ref("");
    email.value = localStorage.getItem("email");
    return {
      email,
      leftDrawerOpen: ref(false),
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: map-get($cs, text);
}
</style>
