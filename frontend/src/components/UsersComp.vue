<template>
  <q-page id="RegisterPage">
    <h2>Currently Registered User Profiles</h2>
    <br />
    <div v-if="adminAuth()">
      <div class="grid3x3">
        <div v-for="User in uState.Users" :key="User._id">
          <div style="border: 1px solid black; border-radius: 15px">
            Email:&nbsp;&nbsp;{{ User.email }}
          </div>
          <router-link :to="`/users/${User._id}`" class="remove_linkStyle">
            <button class="full-width">
              <strong>Edit User</strong>
            </button>
          </router-link>
          <button @click="DeleteUser(User._id)">Delete</button>
          <br />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from '../modules/userCRUD';
import { ref } from 'vue';
import { onMounted } from 'vue';

export default {
  name: 'UsersComp',

  setup() {
    const email = ref(null);
    const password = ref(null);
    const {
      uState,
      GetAllUsers,
      DeleteUser,
      EditUser,
      RegisterUser,
      RegisterUserByAdmin,
    } = UserCRUD();
    onMounted(() => {
      GetAllUsers();
    });
    return {
      email,
      password,
      uState,
      GetAllUsers,
      DeleteUser,
      EditUser,
      RegisterUser,
      RegisterUserByAdmin,

      async created() {
        // if it is admin > get users by them
        // if it is superadmin > all users
        GetAllUsers();
      },

      async onSubmit() {
        if (localStorage.getItem('level') === 'admin') {
          RegisterUserByAdmin();
        } else {
          RegisterUser();
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
      userAuth() {
        return (
          localStorage.getItem('Token') !== null &&
          localStorage.getItem('Token') !== undefined
        );
      },
      adminAuth() {
        return (
          localStorage.getItem('level') === 'admin' ||
          localStorage.getItem('level') === 'superadmin'
        );
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
