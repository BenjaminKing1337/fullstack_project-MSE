<template>
  <div id="LoginPage">
    Login
    <div class="formContainer">
      <form id="LoginForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="text" v-model="email" />
        <input placeholder="Password" type="text" v-model="password" />
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
      console.log(response);
      // localStorage.setItem("Token", response.data.data.Token);
      localStorage.setItem("name", response.data.email);
      localStorage.setItem("level", response.data.userlevel);
      localStorage.setItem("userid", response.data.id);
      this.$router.push("/");
    },
    onReset() {
      this.email = null;
      this.password = null;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>