<template>
  <q-page class="page">
    <h4>Single Property's page</h4>
    <p>Here you can edit and manage your individual Property</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Property</b></div>
      </div>
      <br />
      <br />
      <form @submit.prevent="EditProperty">
        <div>
          <div class="spaced">
            <div>Name:</div>
            <input type="text" placeholder="Name" v-model="Property.name" />
          </div>
          <div class="spaced">
            <div>Floor:</div>
            <input type="text" placeholder="Floor" v-model="Property.floor" />
          </div>
          <div class="spaced">
            <div>No.:</div>
            <input
              type="text"
              placeholder="Number"
              required
              v-model="Property.number"
            />
          </div>
          <div class="spaced">
            <div>Address:</div>
            <input
              type="text"
              placeholder="Address"
              v-model="Property.address"
            />
          </div>
          <div class="spaced">
            <div>Postal Code:</div>
            <input
              type="text"
              placeholder="Postal Code"
              v-model="Property.postal_code"
            />
          </div>
          <div class="spaced">
            <div>Value:</div>
            <input type="text" placeholder="Value" v-model="Property.value" />
          </div>
          <div class="spaced">
            <div>Bank Note:</div>
            <input
              type="text"
              placeholder="Bank Note"
              v-model="Property.bank_note"
            />
          </div>
          <div class="spaced">
            <div>Building:</div>
            <select v-model="Property.building_id">
              <option>Assign Building</option>
              <option
                v-for="Building in bState.Buildings"
                :key="Building._id"
                :value="Building._id"
              >
                {{ Building.name }} {{ Building.number }}
              </option>
            </select>
          </div>
          <div class="spaced">
            <div>Owner:</div>
            <select v-model="Property.owner_id">
              <option>Assign Owner</option>
              <option
                v-for="Tenant in filterProps(tState.Tenants, created_by)"
                :key="Tenant._id"
                :value="Tenant._id"
              >
                {{ Tenant.forename }} {{ Tenant.surname }}
              </option>
            </select>
          </div>
          <div class="spaced">
            <div>Renter:</div>
            <select v-model="Property.renter_id">
              <option>Assign Renter</option>
              <option
                v-for="Tenant in tState.Tenants"
                :key="Tenant._id"
                :value="Tenant._id"
              >
                {{ Tenant.forename }} {{ Tenant.surname }}
              </option>
            </select>
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
import PropertyCRUD from "../modules/propertyCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      pState,
      Property,
      PropertyId,
      // GetAllProperties,
      GetSpecificProperty,
      EditProperty,
    } = PropertyCRUD();
    const { tState, Tenant, TenantId, GetAllTenants } = TenantCRUD();
    const { bState, Building, GetAllBuildings } = BuildingCRUD();

    GetSpecificProperty();
    GetAllTenants();

    const Router = useRouter();

    let filterCreatedBy = (Properties, tenantId) => {
      let propsFiltered = [];
      for (var i = 0; i < Properties.length; i++) {
        if (
          Properties[i].owner_id == tenantId ||
          Properties[i].renter_id == tenantId
        ) {
          propsFiltered.push(Properties[i]);
        }
      }
      return propsFiltered;
    };
    const created_by = localStorage.getItem("userid");

    return {
      filterCreatedBy,
      created_by,
      bState,
      Building,
      GetAllBuildings,
      tState,
      Tenant,
      TenantId,
      pState,
      Property,
      PropertyId,
      GetAllTenants,
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

<style lang="scss" scoped>
</style>