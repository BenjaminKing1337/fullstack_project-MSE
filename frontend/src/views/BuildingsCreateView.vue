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
    <q-form @submit.prevent="NewBuilding()" class="q-gutter-xs">
      <div class="create-card">
        <div class="title">
          <div class="cardheader"><b>Create New Building</b></div>
        </div>
        <br />
        <q-input
          outlined
          type="text"
          label="Name *"
          v-model="bState.name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Name cannot be empty',
            (val) =>
              val.length > 1 || 'Name must be at least 2 characters long',
          ]"
        />
        <br />
        <q-input
          outlined
          type="text"
          label="Number *"
          v-model="bState.number"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Number cannot be empty',
            (val) =>
              val.length > 0 || 'Number must be at least 1 character long',
          ]"
        />
        <br />
        <q-input
          outlined
          type="text"
          label="Postal Code *"
          v-model="bState.postal_code"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Postal Code cannot be empty',
            (val) =>
              val.length > 3 ||
              'Postal Code must be at least 4 characters long',
          ]"
        />

        <br />
        <div>
          <q-btn class="q-btn create-btn" type="submit">
            Create New Building
          </q-btn>
        </div>
      </div>
    </q-form>
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
