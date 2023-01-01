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
      <form @submit.prevent="EditBuilding" class="q-gutter-xs">
        <div>
          <div class="spaced">
            <div>Name *</div>
            <q-input
              outlined
              type="text"
              v-model="Building.name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Name cannot be empty',
                (val) =>
                  val.length > 1 || 'Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Number *</div>
            <q-input
              outlined
              type="text"
              v-model="Building.number"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Number cannot be empty',
                (val) =>
                  val.length > 0 || 'Number must be at least 1 character long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Postal Code *</div>
            <q-input
              outlined
              type="text"
              v-model="Building.postal_code"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Postal Code cannot be empty',
                (val) =>
                  val.length > 3 ||
                  'Postal Code must be at least 4 characters long',
              ]"
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
import BuildingCRUD from "../modules/buildingCRUD";
import { useRouter } from "vue-router";

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
        Router.push("/buildings");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
