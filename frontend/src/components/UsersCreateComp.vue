<template>
  <q-page class="page" align="center">
    <div class="pageheader">
      <div>
        <h4>Welcome to Users menu</h4>
        <p align="left">Here you can create and manage your Users</p>
      </div>
      <router-link to="/users" class="remove_linkStyle">
        <q-btn class="q-btn"> View All </q-btn>
      </router-link>
    </div>
    <br />
    <!-- Create New  -->
    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Create New User</b></div>
      </div>
      <br />
      <q-form
        ref="RegisterForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs"
      >
        <q-input
          outlined
          v-model="uState.email"
          type="email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Email cannot be empty',
            (val) =>
              val.length > 5 || 'Email must be at least 6 characters long',
          ]"
        />
        <q-input
          outlined
          v-model="uState.password"
          label="Password"
          type="password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Password cannot be empty',
            (val) =>
              val.length > 5 || 'Password must be at least 6 characters long',
          ]"
        />
        <div class="show-btns">
          <q-btn class="q-btn" label="Register" type="submit" />
          <q-btn class="q-btn" label="Reset" type="reset">
            <q-tooltip>This button will reset the form values</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
    <br />
    <br />
  </q-page>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { ref } from "vue";

export default {
  name: "UsersCreateComp",

  setup() {
    const {
      uState,
      RegisterUser,
      RegisterUserByAdmin,
    } = UserCRUD();
    const RegisterForm = ref(null);

   
    const onSubmit = async () => {
      RegisterForm.value.validate().then((success) => {
        if (success) {
          if (
            localStorage.getItem("level") === "admin" ||
            localStorage.getItem("level") === "superadmin"
          ) {
            RegisterUserByAdmin();
          } else {
            RegisterUser();
          }
        }
      });
    };
    return {
      uState,
      RegisterUser,
      RegisterUserByAdmin,
      onSubmit,
      RegisterForm,

      async created() {
      },

      onReset() {
        uState.value.email = null;
        uState.value.password = null;
      },
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
