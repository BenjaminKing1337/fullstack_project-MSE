<template>
  <div id="LoginPage">
    Login
    <div class="formContainer">
      <form id="LoginForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="email" v-model="email" />
        <input placeholder="Password" type="password" v-model="password" />
        <button type="submit">Login</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginComp",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      const response = await axios.post("users/login", {
        email: this.email,
        password: this.password,
      });

      localStorage.setItem("Token", response.data.data.Token);
      // localStorage.setItem("name", response.data.name);
      localStorage.setItem("level", response.data.level);
      localStorage.setItem("userid", response.data.id);
      this.$router.go("/");
    },
    onReset() {
        this.email = null;
        this.password = null;
      },
  },
};</script>

<style lang="scss" scoped>
</style>