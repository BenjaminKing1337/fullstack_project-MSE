<template>
  <body>
    <h4>Welcome to Buildings page</h4>
    <p>Here you can create and manage your Buildings</p>
    <!-- Create New -->
    <div class="create-card">
      <div class="title">
        <div class="cardheader">Create new Building</div>
      </div>
      <br />
      <input placeholder="Name" v-model="bState.name" /> <br />
      <input placeholder="Number" v-model="bState.number" /> <br />
      <input placeholder="Postal Code" v-model="bState.postal_code" /> <br />
      <br />
      <div>
        <button class="create-btn" @click="NewBuilding()">
          Create New Building
        </button>
      </div>
    </div>
  </body>
</template>

<script>
import UserCRUD from '../modules/userCRUD';
import BuildingCRUD from '../modules/buildingCRUD';
import { onMounted } from 'vue';
export default {
  setup() {
    const { uState, User, GetAllUsers } = UserCRUD();
    const {
      bState,
      GetAllBuildings,
      GetUsersBuildings,
      GetSpecificBuilding,
      NewBuilding,
      DeleteBuilding,
    } = BuildingCRUD();

    onMounted(() => {
      GetUsersBuildings();
      GetAllUsers();
    });

    return {
      GetAllUsers,
      User,
      uState,
      bState,
      GetAllBuildings,
      GetUsersBuildings,
      GetSpecificBuilding,
      NewBuilding,
      DeleteBuilding,
    };
  },
};
</script>

<style lang="scss" scoped></style>
