<template>
  <div id="RegisterPage">
    Register
    <!-- <div class="formContainer">
      <form id="RegisterForm" @submit.prevent="onSubmit" @reset="onReset">
        <input placeholder="Email" type="text" v-model="uState.email" />
        <input placeholder="Password" type="text" v-model="uState.password" />
        <input placeholder="Confirm Password" type="text" />
      </form>
      <div><button @click="NewUser()">Create New User</button></div>
    </div> -->
 <div>
      <div>
        <div>
          <div>Create new User</div>
        </div>

        <div>
          <input
            v-model="uState.email"
          /> <br>
          <input
            v-model="uState.password"
          /> <br>
          <div>
          </div>
        </div>

        <div>
          <button @click="NewUser()">Create New User</button>
        </div>
      </div>
    </div>
    <div v-for="User in uState.Users" :key="User.id">
      <br />
      <div>{{ User.email }}</div>
      <div style="border: 1px solid black; border-radius: 15px">
        ID:&nbsp;&nbsp;{{ User.id }} <br />
        Email:&nbsp;&nbsp;{{ User.email }}<br />
        Password:&nbsp;&nbsp;{{ User.password }} <br />
      </div>
      <router-link :to="`/edituser/${User.id}`" class="remove_linkStyle">
          <button class="full-width">
            <strong>Edit</strong>
          </button>
        </router-link>
      <button @click="DeleteUser(User.id)">Delete</button>
        
    </div>

  </div>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const { uState, GetAllUsers, GetSpecificUser, NewUser, DeleteUser } =
      UserCRUD();

    onMounted(() => {
      GetAllUsers();
    });

    return {
      uState,
      GetAllUsers,
      GetSpecificUser,
      NewUser,
      DeleteUser,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>