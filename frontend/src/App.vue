<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="toolbar glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Main Solution Estates </q-toolbar-title>

        <div>
          Hello,
          <b class="login-name">{{
            email.charAt(0).toUpperCase() + email.slice(1).split("@")[0]
          }}</b>
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
    };
  },
};
</script>
