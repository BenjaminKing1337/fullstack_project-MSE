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

      <!-- NEW NAV  -->
      <div v-if="superadminAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">Customers</button>
        <div class="dropdown-content">
          <a> <router-link @click="toggle_favourite" id="rl" to="/newcustomer">Add New</router-link></a>
          <a> <router-link id="rl" to="/customers">View All</router-link></a>
        </div>
      </div>
      <div v-if="adminAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">Buildings</button>
        <div class="dropdown-content">
          <a> <router-link id="rl" to="/newbuilding">Add New</router-link></a>
          <a> <router-link id="rl" to="/buildings">View All</router-link></a>
        </div>
      </div>
      <div v-if="adminAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">Properties</button>
        <div class="dropdown-content">
          <a> <router-link id="rl" to="/newproperty">Add New</router-link></a>
          <a> <router-link id="rl" to="/properties">View All</router-link></a>
        </div>
      </div>
      <div v-if="adminAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">Tenants</button>
        <div class="dropdown-content">
          <a> <router-link id="rl" to="/newtenant">Add New</router-link></a>
          <a> <router-link id="rl" to="/tenants">View All</router-link></a>
        </div>
      </div>
      <div v-if="userAuth() && !userlevelAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">Register</button>
        <div class="dropdown-content">
          <a> <router-link id="rl" to="/register">Add New</router-link></a>
          <a> <router-link id="rl" to="/users">View All</router-link></a>
        </div>
      </div>
      <div v-if="!userAuth()">
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="userAuth()" class="dropdown">
        <button id="rlb" class="dropbtn">
          Hello, <br />
          <b class="login-name">{{
            email.charAt(0).toUpperCase() + email.slice(1).split("@")[0]
          }}</b>
        </button>
        <div class="dropdown-content">
          <a v-if="userAuth()">
            <div>
              <router-link to="/logout">Log Out</router-link>
            </div></a
          >
        </div>
      </div>

      <!-- OLD NAV  -->
      <!-- <div v-if="superadminAuth()">
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
      <div v-if="userAuth() && !userlevelAuth()">
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
          email.charAt(0).toUpperCase() + email.slice(1).split("@")[0]
        }}</b>
      </div> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const email = ref("");

    // const isActive = async () => {
    //   var rlb = document.getElementById("rlb");
    //   var rl = document.getElementById("rl");
    //   if (
    //     rl.classList.contains("router-link-exact-active") &&
    //     rl.classList.contains("router-link-active")
    //   ) {
    //     console.log("no shit");
    //     rlb.style.color = "";
    //   } else {
    //     rlb.style.color = "red";
    //     console.log("shit");
    //   }
    // };

  


    return {
      // isActive,
      userAuth() {
        email.value = localStorage.getItem("email");
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      userlevelAuth() {
        return localStorage.getItem("level") === "user";
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
      superadminAuth() {
        return localStorage.getItem("level") === "superadmin";
      },
      email,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
