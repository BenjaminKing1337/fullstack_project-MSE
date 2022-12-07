<template>
  <body>
    <h4>Welcome to Properties page</h4>
    <p>Here you can create and manage your Properties</p>

    <div>
      <div>
        <div>
          <div>Create new Property</div>
        </div>

        <div>
          Name: <input v-model="pState.name" /> <br />
          Floor: <input v-model="pState.floor" /> <br />
          Number: <input v-model="pState.number" /> <br />
          Address: <input v-model="pState.address" /> <br />
          Postal Code: <input v-model="pState.postal_code" /> <br />
          Value: <input v-model="pState.value" /> <br />
          Bank Note: <input v-model="pState.bank_note" /> <br />
          <!-- Created by: <input
            v-model="pState.created_by"
          /> <br>
          Building ID: <input
            v-model="pState.building_id"
          /> <br>
          Renter ID: <input
            v-model="pState.renter_id"
          /> <br>
          Owner ID: <input
            v-model="pState.owner_id"
          /> <br> -->
          Owner:
          <select v-model="pState.owner_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              {{ Tenant.email }}
            </option>
          </select>
          <br />
          Renter:
          <select v-model="pState.renter_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              {{ Tenant.email }}
            </option>
          </select>
          <div></div>
        </div>

        <div>
          <button @click="NewProperty()">Create New Property</button>
        </div>
      </div>
    </div>

    <h6>My Properties</h6>
    <div>
      <div v-for="Property in pState.Properties" :key="Property._id">
        <br />
        <div>{{ Property.name }}</div>
        <div style="border: 1px solid black; border-radius: 15px">
          ID:&nbsp;&nbsp;{{ Property._id }} <br />
          Name:&nbsp;&nbsp;{{ Property.name }} <br />
          Floor:&nbsp;&nbsp;{{ Property.floor }} <br />
          No.:&nbsp;&nbsp;{{ Property.number }}<br />
          Address:&nbsp;&nbsp;{{ Property.address }} <br />
          Postal Code:&nbsp;&nbsp;{{ Property.postal_code }} <br />
          Value:&nbsp;&nbsp;{{ Property.value }} <br />
          Bank Note:&nbsp;&nbsp;{{ Property.bank_note }} <br />
          Created by:&nbsp;&nbsp;{{ Property.created_by }} <br />
          Building ID:&nbsp;&nbsp;{{ Property.building_id }} <br />
          Renter ID:&nbsp;&nbsp;{{ Property.renter_id }} <br />
          Owner ID:&nbsp;&nbsp;{{ Property.owner_id }} <br />
        </div>

        <router-link
          :to="`/properties/${Property._id}`"
          class="remove_linkStyle"
        >
          <button class="full-width">
            <strong>Update</strong>
          </button>
        </router-link>
        <button @click="DeleteProperty(Property._id)">Delete</button>
      </div>
    </div>
  </body>
</template>

<script>
import PropertyCRUD from '../modules/propertyCRUD';
import UserCRUD from '../modules/userCRUD';
import TenantCRUD from '../modules/tenantCRUD';
import { onMounted } from 'vue';
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
