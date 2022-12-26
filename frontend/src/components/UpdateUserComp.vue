<template>
  <q-page class="page">
    <h6>My Profile</h6>
    <div class="show-card">
      <div class="title">
        <div class="cardheader">Update User</div>
      </div>
      <form @submit.prevent="EditUser">
        <br />
        <div class="spaced">
          <div>Email:</div>
          <input
            type="text"
            placeholder="Email"
            required
            v-model="User.email"
          />
        </div>
        <div class="spaced" v-if="adminAuth() || superadminAuth()">
          <div>Level:</div>
          <input type="text" placeholder="Level" v-model="User.userlevel" />
        </div>
        <div class="spaced">
          <div></div>
          <button @click="editPswd">
            <strong>Edit Password</strong>
          </button>
        </div>
        <div class="show-btns">
          <button type="submit">Confirm</button>
          <button type="button" @click="goBack()">Back</button>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import Notify from "../modules/utils.js";

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
      var url = window.location.pathname.split("/");
      var url_id = url[2];

      if (localStorage.getItem("userid") === url_id) {
        // The user is the one logged in, so we send them to pswd change
        Router.push("/pwd/" + User.value._id + "");
      } else {
        NotifyError(
          "The password can only be changed when the specific user is logged in"
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
        Router.push("/users");
      },
      adminAuth() {
        return localStorage.getItem("level") === "admin";
      },
      superadminAuth() {
        return localStorage.getItem("level") === "superadmin";
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
