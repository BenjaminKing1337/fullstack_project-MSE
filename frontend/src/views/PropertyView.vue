<template>
  <q-page class="page" align="center">
    <h4>Single Property's page</h4>
    <p>Here you can edit and manage your individual Property</p>
    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Property</b></div>
      </div>
      <br />
      <br />
      <q-form @submit.prevent="EditProperty" class="q-gutter-xs">
        <div>
          <div class="spaced">
            <div>Name *</div>
            <!-- <input type="text" placeholder="Name" v-model="Property.name" /> -->
            <q-input
              outlined
              type="text"
              v-model="Property.name"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Name cannot be empty',
                (val) =>
                  val.length > 1 || 'Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Floor</div>
            <q-input outlined type="text" v-model="Property.floor" />
          </div>
          <div class="spaced">
            <div>No. *</div>
            <q-input
              outlined
              type="text"
              v-model="Property.number"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Number must be at least 1 character long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Address *</div>
            <q-input
              outlined
              type="text"
              v-model="Property.address"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Address cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'Address must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Postal Code *</div>
            <q-input
              outlined
              type="text"
              v-model="Property.postal_code"
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
          <div class="spaced">
            <div>Value (Percentage %) *</div>
            <q-input
              outlined
              type="text"
              v-model="Property.value"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Value cannot be empty',
                (val) => val <= 100 || 'Value must be maximum 100.00%',
                (val) => val.length < 7 || 'Value must be maximum 5 characters',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Bank Note *</div>
            <q-input
              outlined
              type="text"
              v-model="Property.bank_note"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Bank Note cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'Bank Note must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Building:</div>
            <q-select
              color="color"
              v-model="Property.building_id"
              outlined
              :options="bState.BuildingsFormattedQ"
              map-options
              emit-value
            />
          </div>
          <div class="spaced">
            <div>Owner:</div>
            <q-select
              color="color"
              v-model="Property.owner_id"
              outlined
              :options="tState.OwnersFormattedQ"
              map-options
              emit-value
            />
          </div>
          <div class="spaced">
            <div>Renter:</div>
            <q-select
              color="color"
              v-model="Property.renter_id"
              outlined
              :options="tState.RentersFormattedQ"
              map-options
              emit-value
            />
          </div>
        </div>
        <div class="show-btns">
          <q-btn class="q-btn" type="submit">Update</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    const { pState, Property, PropertyId, GetSpecificProperty, EditProperty } =
      PropertyCRUD();
    const { tState, Tenant, TenantId, GetUsersTenants } = TenantCRUD();
    const { bState, Building, GetUsersBuildings } = BuildingCRUD();

    onMounted(() => {
      GetSpecificProperty();
      GetUsersTenants();
      GetUsersBuildings();
    });

    const Router = useRouter();

    let filterCreatedBy = (Object, created_by) => {
      let createdByFiltered = [];
      for (var i = 0; i < Object.length; i++) {
        if (Object[i].created_by == created_by) {
          createdByFiltered.push(Object[i]);
        }
      }
      return createdByFiltered;
    };
    const created_by = localStorage.getItem("userid");

    return {
      filterCreatedBy,
      created_by,
      bState,
      Building,
      GetUsersBuildings,
      tState,
      Tenant,
      TenantId,
      GetUsersTenants,
      pState,
      Property,
      PropertyId,
      GetSpecificProperty,
      EditProperty,
      goBack() {
        // return Router.go(-1);
        Router.push("/properties");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
