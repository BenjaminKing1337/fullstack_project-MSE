<template>
  <q-page class="page" align="center">
    <h4>Welcome to MSE</h4>
    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Verify Identity</b></div>
      </div>
      <br />
      <q-form
        ref="LoginForm"
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
          :rules="[(val) => (val && val.length > 0) || 'Email cannot be empty']"
        />
        <q-input
          outlined
          v-model="uState.password"
          label="Password"
          type="password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Password cannot be empty',
          ]"
        />
        <div class="show-btns">
          <q-btn class="q-btn" label="Login" type="submit" />
          <q-btn class="q-btn" label="Reset" type="reset">
            <q-tooltip>This button will reset the form values</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { ref } from "vue";

export default {
  name: "LoginComp",

  setup() {
    const { uState, LoginUser } = UserCRUD();
    const LoginForm = ref(null);
    const onSubmit = async () => {
      LoginForm.value.validate().then((success) => {
        if (success) {
          LoginUser();
        }
      });
    };
    const onReset = () => {
      uState.value.email = "";
      uState.value.password = "";
    };

    return {
      uState,
      LoginUser,
      onSubmit,
      onReset,
      LoginForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
