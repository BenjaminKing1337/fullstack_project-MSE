<template>
  <q-page class="page" align="center">
    <h4>Single Building's page</h4>
    <p>Here you can edit and manage your individual Building</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Building</b></div>
      </div>
      <br />
      <br />
      <form @submit.prevent="EditBuilding">
        <div>
          <div class="spaced">
            <div>Name:</div>
            <input type="text" placeholder="Name" v-model="Building.name" />
          </div>
          <div class="spaced">
            <div>No.:</div>
            <input
              type="text"
              placeholder="Number"
              required
              v-model="Building.number"
            />
          </div>
          <div class="spaced">
            <div>Postal Code:</div>
            <input
              type="text"
              placeholder="Number"
              required
              v-model="Building.postal_code"
            />
          </div>
        </div>
        <div class="show-btns">
          <q-btn class="q-btn" type="submit">Update</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import BuildingCRUD from '../modules/buildingCRUD';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { bState, Building, BuildingId, GetSpecificBuilding, EditBuilding } =
      BuildingCRUD();

    GetSpecificBuilding();

    const Router = useRouter();

    return {
      bState,
      Building,
      BuildingId,
      GetSpecificBuilding,
      EditBuilding,
      goBack() {
        // return Router.go(-1);
        Router.push('/buildings');
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
