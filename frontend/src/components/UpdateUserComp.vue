<template>
  <body>
    <h6>My Profile</h6>
    <form @submit.prevent="EditUser">
      <div style="border: 1px solid black; border-radius: 15px">
        ID: {{ User._id }} <br />
        Email:
        <input type="text" placeholder="Email" required v-model="User.email" />
        <br />
        <div v-if="adminAuth()">
          Level:
          <input type="text" placeholder="Level" v-model="User.userlevel" />
          <br />
        </div>
      </div>
      <button type="submit">Update Email</button>
    </form>
    <!-- <router-link :to="`/pwd/${User._id}`" class="remove_linkStyle"> -->
    <button class="full-width" @click="editPswd">
      <strong>Edit Password</strong>
    </button>
    <!-- </router-link> -->
    <br />
    <br />

    <button type="button" @click="goBack()">Back</button>
  </body>
</template>

<script>
import UserCRUD from '../modules/userCRUD';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import Notify from '../modules/utils.js';

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
    const Router = useRouter();
    const { NotifyError } = Notify();
    const editPswd = () => {
      // Gets id from url
      var url = window.location.pathname.split('/');
      var url_id = url[2];

      if (localStorage.getItem('userid') === url_id) {
        // The user is the one logged in, so we send them to pswd change
        Router.push('/pwd/' + User.value._id + '');
      } else {
        NotifyError(
          'The password can only be changed when the specific user is logged in'
        );
      }
    };
    onMounted(() => {
      GetSpecificUser();
    });

    return {
      editPswd,
      uState,
      User,
      UserId,
      // GetAllUsers,
      GetSpecificUser,
      EditUser,
      goBack() {
        // return Router.go(-1);
        Router.push('/users');
      },
      adminAuth() {
        return localStorage.getItem('level') === 'admin';
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
