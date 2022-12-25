<template>
  <div id="RegisterPage">
    Register New User
    <div class="formContainer">
      <q-form
        id="RegisterForm"
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
        <div>
          <q-btn label="Register" type="submit" />
          <q-btn label="Reset" type="reset">
            <q-tooltip>This button will reset the form values</q-tooltip>
          </q-btn>
        </div>
      </q-form>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import UserCRUD from '../modules/userCRUD';
import { onMounted } from 'vue';

export default {
  name: 'UsersCreateComp',

  setup() {
    const {
      uState,
      GetAllUsers,
      DeleteUser,
      EditUser,
      RegisterUser,
      RegisterUserByAdmin,
    } = UserCRUD();
    onMounted(() => {
      // GetAllUsers();
    });
    return {
      uState,
      GetAllUsers,
      DeleteUser,
      EditUser,
      RegisterUser,
      RegisterUserByAdmin,

      async created() {
        GetAllUsers();
      },

      async onSubmit() {
        if (localStorage.getItem('level') === 'admin' || localStorage.getItem('level') === 'superadmin') {
          RegisterUserByAdmin();
        } else {
          RegisterUser();
        }
      },

      onReset() {
        uState.value.email = null;
        uState.value.password = null;
      },
      userAuth() {
        return (
          localStorage.getItem('Token') !== null &&
          localStorage.getItem('Token') !== undefined
        );
      },
      adminAuth() {
        return localStorage.getItem('level') === 'admin';
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
