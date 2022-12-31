<template>
  <q-page class="page" align="center">
    <h6>My Profile</h6>
    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update User</b></div>
      </div>
      <q-form @submit.prevent="EditUser" class="q-gutter-xs">
        <br />
        <div class="spaced">
          <!-- <div>Email:</div> -->
          <q-input
            outlined
            type="email"
            label="Email"
            required
            v-model="User.email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Email cannot be empty',
              (val) =>
                val.length > 5 || 'Email must be at least 6 characters long',
            ]"
          />
        </div>
        <!-- <div v-if="adminAuth() || superadminAuth()">
          <q-select
            v-model="User.userlevel"
            outlined
            :options="editOptions"
            label="User type"
          />
        </div> -->
        <div v-if="loggedInAuth()" class="spaced">
          <div></div>
          <q-btn class="q-btn" @click="editPswd">
            <strong>Edit Password</strong>
          </q-btn>
        </div>
        <div class="show-btns">
          <q-btn class="q-btn" type="submit">Confirm</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </q-form>
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
      GetSpecificUser,
      EditUser,
    } = UserCRUD();
    const Router = useRouter();
    const editOptions = ["user", "admin", "superadmin"];
    const { NotifyError } = Notify();
    const editPswd = () => {
      // Gets id from url
      // var url = window.location.pathname.split("/");
      // var url_id = url[2];
      // console.log(url_id);
      if (localStorage.getItem("userid") === UserId.value) {
        // The user is the one logged in, so we send them to pswd change
        Router.push("/pwd/" + localStorage.getItem("userid") + "");
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
      GetSpecificUser,
      EditUser,
      editOptions,
      
      goBack() {
        Router.push("/users");
      },
      loggedInAuth() {
        return localStorage.getItem("userid") === UserId.value;
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
