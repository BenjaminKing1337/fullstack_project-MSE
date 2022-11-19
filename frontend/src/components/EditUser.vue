<template>
  <body>
    <h4>Welcome to A single User's page</h4>
    <p>Here you can create and manage your individual User</p>

    <h6>My User</h6>

    <!-- <div v-for="Item in User" :key="Item.id"> -->
    <div>
      <div style="border: 1px solid black; border-radius: 15px">
        Email:&nbsp;&nbsp;{{ User.email }}<br />
        Password:&nbsp;&nbsp;{{ User.password }} <br />
        Level:&nbsp;&nbsp;{{ User.userlevel }}
      </div>
      <form @submit.prevent="EditUser">
        <input type="text" placeholder="Number" required v-model="User.email" />
        <br />
        <input type="text" placeholder="Address" v-model="User.password" />
        <br />
        <input type="text" placeholder="Name" v-model="User.userlevel" />
        <br />
        <button type="submit">Update</button>
      </form>
      <button type="button" @click="goBack()">Back</button>
    </div>

    <!-- {{ User.id }} -->
    <!-- </div> -->
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