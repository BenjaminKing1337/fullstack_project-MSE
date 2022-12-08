<template>
  <div id="RegisterPage">
    Register
    <div class="formContainer">
      <form id="RegisterForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="email" v-model="uState.email" />
        <input
          placeholder="Password"
          type="password"
          v-model="uState.password"
        />
        <div>
          <button type="submit">Register</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
    <br />
    <br />
    <div v-if="adminAuth()">
      Current Users:
      <div class="grid3x3">
        <div v-for="User in uState.Users" :key="User._id">
          <div style="border: 1px solid black; border-radius: 15px">
            Email:&nbsp;&nbsp;{{ User.email }}
          </div>
          <router-link :to="`/users/${User._id}`" class="remove_linkStyle">
            <button class="full-width">
              <strong>Edit User</strong>
            </button>
          </router-link>
          <button @click="DeleteUser(User._id)">Delete</button>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { ref } from "vue";
import { onMounted } from "vue";

export default {
  name: "RegisterComp",

  setup() {
    const email = ref(null);
    const password = ref(null);
    const { uState, GetAllUsers, DeleteUser, EditUser, RegisterUser, RegisterUserByAdmin } =
      UserCRUD();
    onMounted(() => {
      GetAllUsers();
    });
    return {
      email,
      password,
      uState,
      GetAllUsers,
      DeleteUser,
      EditUser,
      RegisterUser,
      RegisterUserByAdmin,

      async created() {
        GetAllUsers();
      },

      async onSubmit() {
        if (localStorage.getItem("level") === "admin") {
          RegisterUserByAdmin();
        } else {
          RegisterUser();
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>