<template>
  <div id="app">
    <nav>
      <q-list class="list">
        <!-- Home  -->
        <q-item-label header
          ><router-link to="/"
            ><img src="@/assets/logo.png" style="width: 60px; height: 40px"
          /></router-link></q-item-label
        >
        <!-- Customers  -->
        <q-item v-if="superadminAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/customers">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Customers</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/newcustomer"
                  >- Add New</router-link
                ></q-item-label
              >
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/customers"
                  >- View All</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
        <!-- Buildings  -->
        <q-item v-if="adminAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/buildings">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>apartment</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/newbuilding"
                  >- Add New</router-link
                ></q-item-label
              >
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/buildings"
                  >- View All</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
        <!-- Properties  -->
        <q-item v-if="adminAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/properties">
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Properties</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/newproperty"
                  >- Add New</router-link
                ></q-item-label
              >
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/properties"
                  >- View All</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
        <!-- Tenants  -->
        <q-item v-if="adminAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/tenants">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tenants</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  to="/newtenant"
                  >- Add New</router-link
                ></q-item-label
              >
              <q-item-label caption
                ><router-link class="navelement remove_linkStyle" to="/tenants"
                  >- View All</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
        <!-- Users  -->
        <q-item
          v-if="userAuth() && !userlevelAuth()"
          clickable
          tag="a"
          class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/users">
            <q-item-section avatar>
              <q-icon name="supervised_user_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Users</q-item-label>
              <q-item-label caption
                ><router-link class="navelement remove_linkStyle" to="/newuser"
                  >- Add New</router-link
                ></q-item-label
              >
              <q-item-label caption
                ><router-link class="navelement remove_linkStyle" to="/users"
                  >- View All</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
        <!-- Login  -->
        <q-item v-if="!userAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/login">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </router-link></q-item
        >
        <!-- Logout  -->
        <q-item v-if="userAuth()" clickable tag="a" class="navitem"
          ><router-link class="navheader remove_linkStyle" to="/">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Hello,
                <b class="login-name">{{
                  email.charAt(0).toUpperCase() + email.slice(1).split("@")[0]
                }}</b></q-item-label
              >
              <q-item-label caption
                ><router-link class="navelement remove_linkStyle" to="/"
                  >- My Profile</router-link
                ></q-item-label
              >
              <q-item-label caption v-if="userAuth()"
                ><router-link class="navelement remove_linkStyle" to="/logout"
                  >- Log Out</router-link
                ></q-item-label
              >
            </q-item-section>
          </router-link></q-item
        >
      </q-list>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const email = ref("");
    return {
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
nav {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  .list {
    min-width: 100%;
  }
  .navitem {
    &:hover {
      background-color: map-get($cs, highlight);
    }
    .navheader {
      display: flex;
    }
    .navelement {
      &:hover {
        color: map-get($cs, highlight2);
      }
    }
  }
}
</style>
