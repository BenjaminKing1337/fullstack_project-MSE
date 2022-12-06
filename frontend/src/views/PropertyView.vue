<template>
  <body>
    <h4>Single Property's page</h4>
    <p>Here you can edit and manage your individual Property</p>

    <div>
      <form @submit.prevent="EditProperty">
        <div style="border: 1px solid black; border-radius: 15px">
          Name: <input type="text" placeholder="Name" v-model="Property.name" />
          <br />
          Floor:
          <input type="text" placeholder="Floor" v-model="Property.floor" />
          <br />
          No.:<input
            type="text"
            placeholder="Number"
            required
            v-model="Property.number"
          />
          <br />
          Address:
          <input type="text" placeholder="Address" v-model="Property.address" />
          <br />
          Postal Code:
          <input
            type="text"
            placeholder="Postal Code"
            v-model="Property.postal_code"
          />
          <br />
          Value:
          <input type="text" placeholder="Value" v-model="Property.value" />
          <br />
          Bank Note:
          <input
            type="text"
            placeholder="Bank Note"
            v-model="Property.bank_note"
          />
          <br />
          Owner:
          <select v-model="Property.owner_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              {{ Tenant.forename }} {{ Tenant.surname }}
            </option>
          </select>
          Renter:
          <select v-model="Property.renter_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              {{ Tenant.forename }} {{ Tenant.surname }}
            </option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
      <button type="button" @click="goBack()">Back</button>
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