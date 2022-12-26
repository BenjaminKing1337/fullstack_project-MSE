<template>
  <q-page class="page">
    <h5>
      {{ User.email }}
    </h5>
    <h6>New Password</h6>

    <div>
      <div style="border: 1px solid black; border-radius: 15px">
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
          <q-btn class="q-btn" type="submit">Update</q-btn>
        </q-form>
        <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
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
