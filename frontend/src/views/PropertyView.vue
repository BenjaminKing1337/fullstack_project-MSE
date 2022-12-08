<template>
  <body>
    <h4>Single Property's page</h4>
    <p>Here you can edit and manage your individual Property</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader">Update Property</div>
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
            <div>Owner:</div>
            <select v-model="Property.owner_id">
              <option>Assign Owner</option>
              <option
                v-for="Tenant in tState.Tenants"
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
        <button type="submit">Update</button>
      <button type="button" @click="goBack()">Back</button>
        </div>
      </form>
    </div>
  </body>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import TenantCRUD from "../modules/tenantCRUD";
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

    GetSpecificProperty();
    GetAllTenants();

    const Router = useRouter();

    return {
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