<template>
  <q-page class="page">
    <div class="pageheader">
      <h4>Welcome to Users menu</h4>
      <router-link to="/newuser" class="remove_linkStyle">
        <q-btn class="q-btn"> Create New </q-btn>
      </router-link>
    </div>
    <!-- Show All  -->
    <div v-if="adminAuth()">
      <h5>My Users</h5>
      <div class="grid3x3">
        <div v-for="User in uState.Users" :key="User._id">
          <div class="show-card">
            <div class="title">
              <div class="cardheader">
                <b>{{ User.email }}</b>
              </div>
            </div>
            <br />

            <div class="spaced">
              <div>userlevel:</div>
              <div>{{ User.userlevel }}</div>
            </div>
            <div class="show-btns">
              <router-link :to="`/users/${User._id}`" class="remove_linkStyle">
                <q-btn class="q-btn full-width">
                  <strong>Edit User</strong>
                </q-btn>
              </router-link>
              <q-btn class="q-btn" @click="DeleteUser(User._id)">Delete</q-btn>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { onMounted } from "vue";

export default {
  name: "UsersComp",

  setup() {
    const { uState, GetUsersUsers, DeleteUser } = UserCRUD();
    onMounted(() => {
      GetUsersUsers();
    });
    return {
      uState,
      GetUsersUsers,
      DeleteUser,
      async created() {
        // if it is admin > get users by them
        // if it is superadmin > all users
        GetUsersUsers();
      },
      userAuth() {
        return (
          localStorage.getItem("Token") !== null &&
          localStorage.getItem("Token") !== undefined
        );
      },
      adminAuth() {
        return (
          localStorage.getItem("level") === "admin" ||
          localStorage.getItem("level") === "superadmin"
        );
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
