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
    Current Users:
    <div class="grid3x3">
      <div v-for="User in uState.Users" :key="User._id">
        <div style="border: 1px solid black; border-radius: 15px">
          Email:&nbsp;&nbsp;{{ User.email }}
        </div>
        <router-link :to="`/users/${User._id}`" class="remove_linkStyle">
          <button class="full-width">
            <strong>Edit Email</strong>
          </button>
        </router-link>
        <router-link :to="`/pwd/${User._id}`" class="remove_linkStyle">
          <button class="full-width">
            <strong>Edit Password</strong>
          </button>
        </router-link>
        <button @click="DeleteUser(User._id)">Delete</button>
        <br />
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
    const { uState, GetAllUsers, DeleteUser, EditUser, RegisterUser } =
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

      async created() {
        GetAllUsers();
      },

      async onSubmit() {
        RegisterUser();
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>