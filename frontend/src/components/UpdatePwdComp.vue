<template>
  <q-page class="page">
    <h4>
      Logged In User:
      <i>
        {{ User.email }}
      </i>
    </h4>
    <h6>New Password</h6>

    <div>
      <div class="show-card">
        <div class="title">
          <div class="cardheader"><b>Update Password</b></div>
        </div>
        <br />
        <q-form @submit.prevent="EditPwd" class="q-gutter-xs">
          <q-input
            outlined
            type="password"
            label="Password"
            v-model="uState.password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Password cannot be empty',
              (val) =>
                val.length > 5 || 'Password must be at least 6 characters long',
            ]"
          />
          <br />
          <!-- <p> {{ confirmPwd.value }}</p> -->
          <q-input
            outlined
            type="password"
            label="Confirm Password"
            required
            v-model="confirmPwd"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Password confirmation cannot be empty',
              (val) =>
                val.length > 5 || 'Password must be at least 6 characters long',
              (val) =>
                uState.password == val ||
                'Password confirmation must match Password',
            ]"
          />
          <br />
          <div class="show-btns">
            <q-btn class="q-btn" type="submit">Update</q-btn>
            <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
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

<style lang="scss" scoped></style>
