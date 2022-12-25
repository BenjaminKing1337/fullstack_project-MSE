<template>
  <q-page class="page">
    <h4>Single Building's page</h4>
    <p>Here you can edit and manage your individual Building</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader">Update Building</div>
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
          <button type="submit">Update</button>
          <button type="button" @click="goBack()">Back</button>
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
