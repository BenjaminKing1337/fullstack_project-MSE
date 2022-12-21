<template>
  <body>
    <h4>Welcome to Properties page</h4>
    <p>Here you can create and manage your Properties</p>
    <!-- Create New -->
    <div class="create-card">
      <div class="title">
        <div class="cardheader">Create new Property</div>
      </div>
      <br />
      <input placeholder="Name" v-model="pState.name" /> <br />
      <input placeholder="Floor" v-model="pState.floor" /> <br />
      <input placeholder="Number" v-model="pState.number" /> <br />
      <input placeholder="Address" v-model="pState.address" /> <br />
      <input placeholder="Postal Code" v-model="pState.postal_code" /> <br />
      <input placeholder="Value" v-model="pState.value" /> <br />
      <input placeholder="Bank Note" v-model="pState.bank_note" /> <br />
      <!-- Building ID: <input
            v-model="pState.building_id"
          /> -->

      <div>
        <br />
        Add Tenants:
        <br />
        <div>
          <select v-model="pState.owner_id">
            <option>Assign Owner</option>
            <!-- <option>None</option> -->
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div>{{ Tenant.forename }} {{ Tenant.surname }}</div>
              <br />
            </option>
          </select>
        </div>
        <div>
          <select v-model="pState.renter_id">
            <option>Assign Renter</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div>{{ Tenant.forename }} {{ Tenant.surname }}</div>
            </option>
          </select>
        </div>
      </div>
      <br />
      <div>
        <button class="create-btn" @click="NewProperty()">
          Create New Property
        </button>
      </div>
    </div>
    
  </body>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import UserCRUD from "../modules/userCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const {
      pState,
      GetAllProperties,
      GetUsersProperties,
      GetSpecificProperty,
      NewProperty,
      DeleteProperty,
    } = PropertyCRUD();
    const { uState, User, UserId, GetSpecificUser, GetAllUsers } = UserCRUD();
    const { tState, Tenant, GetAllTenants } = TenantCRUD();

    onMounted(() => {
      GetUsersProperties();
      // GetSpecificUser();
      GetAllUsers();
      GetAllTenants();
    });

    return {
      tState,
      Tenant,
      GetAllTenants,
      uState,
      User,
      UserId,
      GetSpecificUser,
      GetAllUsers,
      pState,
      GetAllProperties,
      GetUsersProperties,
      GetSpecificProperty,
      NewProperty,
      DeleteProperty,
    };
  },
};
</script>

<style lang="scss" scoped></style>
