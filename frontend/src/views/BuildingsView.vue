<template>
  <q-page class="page">
    <!-- Show All -->
    <div>
      <h5>My Buildings</h5>
      <div class="grid3x3">
        <div v-for="Building in bState.Buildings" :key="Building._id">
          <br />
          <div class="show-card">
            <div class="title">
              <div class="cardheader">
                <b>{{ Building.name }}</b>
              </div>
            </div>
            <br />
            <br />

            <div class="spaced">
              <div>Number:</div>
              <div>{{ Building.number }}</div>
            </div>

            <div class="spaced">
              <div>Postal Code:</div>
              <div>{{ Building.postal_code }}</div>
            </div>

            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Building.created_by === User._id">Created by:</div>
              <div v-if="Building.created_by === User._id">
                {{ User.email.split('@')[0] }}
              </div>
            </div>
            <br />
            <div class="show-btns">
              <router-link
                :to="`/buildings/${Building._id}`"
                class="remove_linkStyle"
              >
                <q-btn class="q-btn full-width">
                  <strong>Update</strong>
                </q-btn>
              </router-link>
              <q-btn class="q-btn" @click="DeleteBuilding(Building._id)">Delete</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
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
