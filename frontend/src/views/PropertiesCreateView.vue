<template>
  <q-page class="page" align="center">
    <div class="pageheader">
      <div>
        <h4>Welcome to Properties page</h4>
        <p align="left">Here you can create and manage your Properties</p>
      </div>
      <router-link to="/properties" class="remove_linkStyle">
        <q-btn class="q-btn"> View All </q-btn>
      </router-link>
    </div>
    <br />
    <!-- Create New -->
    <q-form @submit.prevent="NewProperty()" class="q-gutter-xs">
      <div class="create-card">
        <div class="title">
          <div class="cardheader"><b>Create New Property</b></div>
        </div>
        <br />
        <q-input
          outlined
          type="text"
          label="Name *"
          v-model="pState.name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Name cannot be empty',
            (val) =>
              val.length > 1 || 'Name must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Floor *"
          v-model="pState.floor"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Floor must be at least 1 character long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Number *"
          v-model="pState.number"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Number must be at least 1 character long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Address *"
          v-model="pState.address"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Address cannot be empty',
            (val) =>
              val.length > 1 || 'Address must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Postal Code *"
          v-model="pState.postal_code"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Postal Code cannot be empty',
            (val) =>
              val.length > 3 ||
              'Postal Code must be at least 4 characters long',
          ]"
        />
        <q-input
          outlined
          type="integer"
          label="Value (Percentage %) *"
          v-model="pState.value"
          lazy-rules
          :rules="[
            (val) => val.length > 0 || 'Value cannot be empty',
            (val) => val.length < 7 || 'Value must be maximum 5 digits long',
            (val) => val <= 100 || 'Value must be maximum 100.00%',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Bank Note *"
          v-model="pState.bank_note"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Bank Note cannot be empty',
            (val) =>
              val.length > 1 || 'Bank Note must be at least 2 characters long',
          ]"
        />
        <div>
          <br />
          Add Building
          <br />
          <div>
            <q-select
              color="color"
              v-model="pState.building_id"
              outlined
              :options="bState.BuildingsFormattedQ"
              map-options
              emit-value
            />
          </div>
        </div>
        <br />
        <div>
          <br />
          Add Tenants
          <br />
          <div>
            <q-select
              color="color"
              v-model="pState.owner_id"
              outlined
              :options="tState.OwnersFormattedQ"
              map-options
              emit-value
            />
          </div>
          <div>
            <q-select
              color="color"
              v-model="pState.renter_id"
              outlined
              :options="tState.RentersFormattedQ"
              map-options
              emit-value
            />
          </div>
        </div>
        <br />
        <div>
          <q-btn class="q-btn create-btn" type="submit"> Add Property </q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import UserCRUD from "../modules/userCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const { pState, NewProperty } = PropertyCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();
    const { tState, Tenant, GetUsersTenants } = TenantCRUD();
    const { bState, Building, GetUsersBuildings } = BuildingCRUD();

    onMounted(() => {
      GetUsersUsers();
      GetUsersTenants();
      GetUsersBuildings();
    });

    return {
      bState,
      Building,
      GetUsersBuildings,
      tState,
      Tenant,
      GetUsersTenants,
      uState,
      User,
      UserId,
      GetUsersUsers,
      pState,
      NewProperty,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
