<template>
  <body>
    <h6>My Profile</h6>

    <div v-for="User in User" :key="User._id">
      <div>
        <div style="border: 1px solid black; border-radius: 15px">
          Email:&nbsp;&nbsp;{{ User.email }}<br />
          Level:&nbsp;&nbsp;{{ User.userlevel }}
        </div>
      </div>
      <form @submit.prevent="EditUser">
        <input type="text" placeholder="Email" required v-model="uState.email" />
        <br />
        <input type="text" placeholder="Password" v-model="uState.password" />
        <br />
        <input type="text" placeholder="Level" v-model="uState.userlevel" />
        <br />
        <button type="submit">Update</button>
      </form>
      <button type="button" @click="goBack()">Back</button>
    </div>
  </body>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      uState,
      User,
      UserId,
      // GetAllUsers,
      GetSpecificUser,
      EditUser,
    } = UserCRUD();
    
    GetSpecificUser();

    console.log(User.value);

    const Router = useRouter();

    return {
      uState,
      User,
      UserId,
      // GetAllUsers,
      GetSpecificUser,
      EditUser,
      goBack() {
        // return Router.go(-1);
        Router.push("/register");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>