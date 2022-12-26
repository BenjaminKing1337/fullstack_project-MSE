<template>
  <q-page class="page" id="LoginPage">
    Login
    <div class="formContainer">
      <q-form
        id="LoginForm"
        ref="LoginForm"
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
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
        <q-btn label="Login" type="submit" />
        <q-btn label="Reset" type="reset">
          <q-tooltip>This button will reset the form values</q-tooltip>
        </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from '../modules/userCRUD';
import { ref } from 'vue';

export default {
  name: 'LoginComp',

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
      uState.value.email = '';
      uState.value.password = '';
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
