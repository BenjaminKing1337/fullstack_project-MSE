<template>
  <div id="RegisterPage">
    Register
    <div class="formContainer">
      <form id="RegisterForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="email" v-model="email" />
        <input placeholder="Password" type="password" v-model="password" />
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
      <div  v-for="User in uState.Users" :key="User._id">
        <div style="border: 1px solid black; border-radius: 15px">
          Email:&nbsp;&nbsp;{{ User.email }}
        </div>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

export default {
  name: "RegisterComp",

  setup() {
    const email = ref(null);
    const password = ref(null);
    const router = useRouter();
    const { uState, GetAllUsers } = UserCRUD();
    onMounted(() => {
      GetAllUsers();
    });
    return {
      email,
      password,
      uState,
      GetAllUsers,

      async created() {
        try {
          const response = await axios.get(`users/`);
          this.posts = response.data;
        } catch (e) {
          this.errors.push(e);
        }
      },

      async onSubmit() {
        try {
          await axios.post("users/register", {
            email: email.value,
            password: password.value,
          });
          router.push("/login");
        } catch (err) {
          let msg = err.response.data.error;
          console.log(msg);
        }
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