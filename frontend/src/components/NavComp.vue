<template>
  <div id="app">
    <nav>
      <q-list class="list">
        <!-- Home  -->
        <q-item-label header
          ><router-link to="/"
            ><img
              src="@/assets/logo.png"
              style="width: 60px; height: 40px" /></router-link
        ></q-item-label>
        <!-- Customers  -->
        <router-link
          v-if="superadminAuth()"
          class="navheader remove_linkStyle"
          to="/customers"
        >
          <q-item clickable tag="a" class="navitem">
            <q-item-section avatar>
              <q-icon name="currency_exchange" />
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
          </q-item>
        </router-link>
        <!-- Buildings  -->
        <router-link
          v-if="adminAuth()"
          class="navheader remove_linkStyle"
          to="/buildings"
        >
          <q-item clickable tag="a" class="navitem">
            <q-item-section avatar>
              <q-icon name="apartment" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Buildings</q-item-label>
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
          </q-item>
        </router-link>
        <!-- Properties  -->
        <router-link
          v-if="adminAuth()"
          class="navheader remove_linkStyle"
          to="/properties"
        >
          <q-item clickable tag="a" class="navitem">
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
          </q-item>
        </router-link>
        <!-- Property userlevel  -->
        <router-link
          v-if="userlevelAuth()"
          class="navheader remove_linkStyle"
          :to="`/property/${userID()}`"
        >
          <q-item clickable tag="a" class="navitem">
            <q-item-section avatar>
              <q-icon name="house" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Property</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  :to="`/property/${userID()}`"
                  >- View Details</router-link
                ></q-item-label
              >
            </q-item-section>
          </q-item>
        </router-link>
        <!-- Tenants  -->
        <router-link
          v-if="adminAuth()"
          class="navheader remove_linkStyle"
          to="/tenants"
        >
          <q-item clickable tag="a" class="navitem">
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
          </q-item>
        </router-link>
        <!-- Tenant userlevel  -->
        <router-link
          v-if="userlevelAuth()"
          class="navheader remove_linkStyle"
          :to="`/tenant/${userID()}`"
        >
          <q-item clickable tag="a" class="navitem">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tenant</q-item-label>
              <q-item-label caption
                ><router-link
                  class="navelement remove_linkStyle"
                  :to="`/tenant/${userID()}`"
                  >- View Details</router-link
                ></q-item-label
              >
            </q-item-section>
          </q-item>
        </router-link>
        <!-- Users  -->
        <router-link
          v-if="userAuth() && !userlevelAuth()"
          class="navheader remove_linkStyle"
          to="/users"
        >
          <q-item clickable tag="a" class="navitem">
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
          </q-item>
        </router-link>
        <!-- Login  -->
        <router-link
          v-if="!userAuth()"
          class="navheader remove_linkStyle"
          to="/login"
        >
          <q-item clickable tag="a" class="navitem">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Login</q-item-label>
            </q-item-section>
          </q-item>
        </router-link>
        <!-- Logout  -->
        <router-link
          v-if="userAuth()"
          class="navheader remove_linkStyle"
          to="/"
        >
          <q-item clickable tag="a" class="navitem">
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
          </q-item>
        </router-link>
      </q-list>
    </nav>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const email = ref("");
    const userid = ref("");
    return {
      userID() {
        userid.value = localStorage.getItem("userid");
        return userid.value;
      },
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
  a {
    font-weight: bold;
    color: map-get($cs, text);
    &.router-link-exact-active {
      color: map-get($cs, highlight-active);
    }
  }
  .navitem {
    margin:  10px;
    padding:  10px;
    border-radius: 5px;
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
