<template>
  <body>
    <h4>Welcome to Tenants page</h4>
    <p>Here you can create and manage your Tenants</p>
    <!-- Create New -->
    <div>
      <form @submit.prevent="NewTenant()">
        <div class="create-card">
          <div class="title">
            <div class="cardheader">Create New Tenant</div>
          </div>
          <br />
          Type: <br />
          <select v-model="tState.type">
            <option>Owner</option>
            <option>Renter</option>
          </select>
          <br />
          <br />
          Personal Info: <br />
          <input
            type="text"
            placeholder="First Name"
            v-model="tState.forename"
          />
          <br />
          <input type="text" placeholder="Last Name" v-model="tState.surname" />
          <br />
          <input type="text" placeholder="Email" v-model="tState.email" />
          <br />
          <input
            type="text"
            placeholder="Phone Number"
            v-model="tState.phone_number"
          />
          <br />
          <input
            type="text"
            placeholder="Account Number"
            v-model="tState.account_number"
          /><br />
          <input
            type="text"
            placeholder="Number of Keys"
            v-model="tState.keys_number"
          />
          <br />
          <input
            type="text"
            placeholder="Closest Neighbour"
            v-model="tState.closest_neighbour"
          />
          <br />
          <input type="text" placeholder="Lease" v-model="tState.lease" />
          <br />
          <div>Assigned User Login:</div>
          <div>
            <select v-model="tState.user_id">
              <option>None</option>
              <option
                v-for="User in uState.Users"
                :key="User._id"
                :value="User._id"
              >
                {{ User.email }}
              </option>
            </select>
          </div> <br>
          Move In Date: <br />
          <input
            type="date"
            placeholder="Move In Date"
            v-model="tState.move_in"
          />
          <br />
          Move Out Date: <br />
          <input
            type="date"
            placeholder="Move Out Date"
            v-model="tState.move_out"
          />
          <br />
          
          <br />
          <button class="create-btn" type="submit">Add Tenant</button>
        </div>
      </form>
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
      // GetAllTenants();
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

<style lang="scss" scoped></style>
