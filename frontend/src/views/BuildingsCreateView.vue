<template>
  <q-page class="page" align="center">
    <div class="pageheader">
      <div>
        <h4>Welcome to Buildings page</h4>
        <p align="left">Here you can create and manage your Buildings</p>
      </div>
      <router-link to="/buildings" class="remove_linkStyle">
        <q-btn class="q-btn"> View All </q-btn>
      </router-link>
    </div>
    <br />

    <!-- Create New -->
    <div class="create-card">
      <div class="title">
        <div class="cardheader"><b>Create New Building</b></div>
      </div>
      <br />
      <input placeholder="Name" v-model="bState.name" /> <br />
      <input placeholder="Number" v-model="bState.number" /> <br />
      <input placeholder="Postal Code" v-model="bState.postal_code" /> <br />
      <br />
      <div>
        <q-btn class="q-btn create-btn" @click="NewBuilding()">
          Create New Building
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserCRUD from "../modules/userCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const { uState, User, GetUsersUsers } = UserCRUD();
    const {
      bState,
      GetUsersBuildings,
      GetSpecificBuilding,
      NewBuilding,
      DeleteBuilding,
    } = BuildingCRUD();

    onMounted(() => {
      GetUsersBuildings();
      GetUsersUsers();
    });

    return {
      GetUsersUsers,
      User,
      uState,
      bState,
      GetUsersBuildings,
      GetSpecificBuilding,
      NewBuilding,
      DeleteBuilding,
    };
  },
};
</script>

<style lang="scss" scoped></style>
