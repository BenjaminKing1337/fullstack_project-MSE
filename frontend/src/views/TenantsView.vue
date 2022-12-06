<template>
  <body>
    <h4>Welcome to Tenants page</h4>
    <p>Here you can create and manage your Tenants</p>

    <div>
      <div>
        <div>
          <div>Create new Tenant</div>
        </div>

        <form @submit.prevent="NewTenant()">
          <div style="border: 1px solid black; border-radius: 15px">
            Type:
            <select v-model="tState.type">
              <option>Owner</option>
              <option>Renter</option>
            </select>
            <br />
            First Name:
            <input
              type="text"
              placeholder="First Name"
              v-model="tState.forename"
            />
            <br />
            Last Name:
            <input
              type="text"
              placeholder="Last Name"
              v-model="tState.surname"
            />
            <br />
            Email:
            <input type="text" placeholder="Email" v-model="tState.email" />
            <br />
            Phone No.:
            <input
              type="text"
              placeholder="Phone Number"
              v-model="tState.phone_number"
            />
            <br />
            Number of Keys:
            <input
              type="text"
              placeholder="Number of Keys"
              v-model="tState.keys_number"
            />
            <br />
            Closest Neighbour:
            <input
              type="text"
              placeholder="Closest Neighbour"
              v-model="tState.closest_neighbour"
            />
            <br />
            Account No.:
            <input
              type="text"
              placeholder="Account Number"
              v-model="tState.account_number"
            />
            <br />
            Move In Date:
            <input
              type="date"
              placeholder="Move In Date"
              v-model="tState.move_in"
            />
            <br />
            Move Out Date:
            <input
              type="date"
              placeholder="Move Out Date"
              v-model="tState.move_out"
            />
            <br />
            Lease:
            <input type="text" placeholder="Lease" v-model="tState.lease" />
            <br />
            Assigned User Login:
          <select v-model="tState.user_id">
            <option
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              {{ User.email }}
            </option>
          </select>
          </div>
          <button type="submit">Add Tenant</button>
        </form>
      </div>
    </div>

    <h6>My Tenants</h6>
    <div>
      <div v-for="Tenant in tState.Tenants" :key="Tenant._id">
        <br />
        <div>{{ Tenant.name }}</div>
        <div style="border: 1px solid black; border-radius: 15px">
          ID:&nbsp;&nbsp; {{ Tenant._id }} <br />
          Type:&nbsp;&nbsp; {{ Tenant.type }} <br />
          First Name:&nbsp;&nbsp; {{ Tenant.forename }} <br />
          Last Name:&nbsp;&nbsp; {{ Tenant.surname }} <br />
          Email:&nbsp;&nbsp; {{ Tenant.email }} <br />
          Phone no:&nbsp;&nbsp; {{ Tenant.phone_number }} <br />
          Number of Keys:&nbsp;&nbsp; {{ Tenant.keys_number }} <br />
          Closest Neighbour:&nbsp;&nbsp; {{ Tenant.closest_neighbour }} <br />
          Account Number:&nbsp;&nbsp; {{ Tenant.account_number }} <br />
          Move In:&nbsp;&nbsp; {{ Tenant.move_in }} <br />
          Move Out:&nbsp;&nbsp; {{ Tenant.move_out }} <br />
          Lease:&nbsp;&nbsp; {{ Tenant.lease }} <br />
          User ID: &nbsp;&nbsp; {{ Tenant.user_id }} <br />
          Customer ID: &nbsp;&nbsp; {{ Tenant.customer_id }} <br />
        </div>

        <router-link :to="`/tenants/${Tenant._id}`" class="remove_linkStyle">
          <button class="full-width">
            <strong>Update</strong>
          </button>
        </router-link>
        <button @click="DeleteTenant(Tenant._id)">Delete</button>
      </div>
    </div>
  </body>
</template>

<script>
import TenantCRUD from "../modules/tenantCRUD";
import UserCRUD from "../modules/userCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const {
      tState,
      Tenant,
      GetAllTenants,
      GetUsersTenants,
      GetSpecificTenant,
      NewTenant,
      DeleteTenant,
    } = TenantCRUD();
    const { uState, User, UserId, GetSpecificUser, GetAllUsers } = UserCRUD();

    onMounted(() => {
      GetUsersTenants();
      // GetSpecificUser();
      GetAllUsers();
      GetAllTenants();
    });

    return {
      Tenant,
      uState,
      User,
      UserId,
      GetSpecificUser,
      GetAllUsers,
      tState,
      GetAllTenants,
      GetUsersTenants,
      GetSpecificTenant,
      NewTenant,
      DeleteTenant,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>