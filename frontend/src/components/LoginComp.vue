<template>
  <div id="LoginPage">
    Login
    <div class="formContainer">
      <form id="LoginForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="email" v-model="uState.email" />
        <input
          placeholder="Password"
          type="password"
          v-model="uState.password"
        />
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserCRUD from "../modules/userCRUD";

export default {
  name: "LoginComp",

  setup() {
    const { uState, LoginUser } = UserCRUD();
    return {
      email: "",
      password: "",
      uState,
      LoginUser,

      async onSubmit() {
        LoginUser();
      },
      onReset() {
        this.email = null;
        this.password = null;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>