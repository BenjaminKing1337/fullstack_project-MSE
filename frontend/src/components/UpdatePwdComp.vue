<template>
  <body>
    <h5>
      {{ User.email }}
    </h5>
    <h6>New Password</h6>

    <div>
      <div style="border: 1px solid black; border-radius: 15px">
        <form @submit.prevent="EditPwd">
          <input
            type="password"
            placeholder="Password"
            required
            v-model="uState.password"
          />
          <br />
          <!-- <p> {{ confirmPwd.value }}</p> -->
          <input
            type="password"
            placeholder="Confirm Password"
            required
            v-model="confirmPwd"
          />
          <br />
          <button type="submit">Update</button>
        </form>
        <button type="button" @click="goBack()">Back</button>
      </div>
    </div>
  </body>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      confirmPwd,
      uState,
      User,
      UserId,
      // GetAllUsers,
      GetSpecificUser,
      EditPwd,
    } = UserCRUD();

    GetSpecificUser();

    const Router = useRouter();

    return {
      confirmPwd,
      uState,
      User,
      UserId,
      // GetAllUsers,
      GetSpecificUser,
      EditPwd,
      goBack() {
        // return Router.go(-1);
        Router.push("/users/" + UserId.value);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>