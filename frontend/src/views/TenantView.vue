<template>
  <body>
    <h4>Single Tenant's page</h4>
    <p>Here you can edit and manage your individual Tenant</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader">Update Tenant</div>
      </div>
      <br />
      <form @submit.prevent="EditTenant">
        <div>
          <!-- <div class="spaced">
            <div>ID:</div>
            {{ Tenant._id }}
          </div> -->
          <div class="spaced">
            <div>Type:</div>
            <input type="text" placeholder="Type" v-model="Tenant.type" />
          </div>
          <div class="spaced">
            <div>First Name:</div>
            <input
              type="text"
              placeholder="First Name"
              v-model="Tenant.forename"
            />
          </div>
          <div class="spaced">
            <div>Last Name:</div>
            <input
              type="text"
              placeholder="Last Name"
              v-model="Tenant.surname"
            />
          </div>
          <div class="spaced">
            <div>Email:</div>
            <input type="text" placeholder="Email" v-model="Tenant.email" />
          </div>
          <div class="spaced">
            <div>Phone no:</div>
            <input
              type="text"
              placeholder="Phone Number"
              v-model="Tenant.phone_number"
            />
          </div>
          <div class="spaced">
            <div>Number of Keys:</div>
            <input
              type="text"
              placeholder="Number of Keys"
              v-model="Tenant.keys_number"
            />
          </div>
          <div class="spaced">
            <div>Closest Neighbour:</div>
            <input
              type="text"
              placeholder="Closest Neighbour"
              v-model="Tenant.closest_neighbour"
            />
          </div>
          <div class="spaced">
            <div>Account Number:</div>
            <input
              type="text"
              placeholder="Account Number"
              v-model="Tenant.account_number"
            />
          </div>
          <div class="spaced">
            <div>Move In:</div>
            <input
              type="text"
              placeholder="Move In Date"
              v-model="Tenant.move_in"
            />
          </div>
          <div class="spaced">
            <div>Move Out:</div>
            <input
              type="text"
              placeholder="Move Out Date"
              v-model="Tenant.move_out"
            />
          </div>
          <div class="spaced">
            <div>Lease:</div>
            <input type="text" placeholder="Lease" v-model="Tenant.lease" />
          </div>
          <div class="spaced">
            <div>User ID:</div>
            <select v-model="Tenant.user_id">
              <option
                v-for="User in uState.Users"
                :key="User._id"
                :value="User._id"
              >
                {{ User.email }}
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
import TenantCRUD from "../modules/tenantCRUD";
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      tState,
      Tenant,
      TenantId,
      // GetAllTenants,
      GetSpecificTenant,
      EditTenant,
    } = TenantCRUD();
    const { uState, User, UserId, GetAllUsers } = UserCRUD();

    GetSpecificTenant();
    GetAllUsers();

    console.log(Tenant.value);

    const Router = useRouter();

    return {
      uState,
      User,
      UserId,
      tState,
      Tenant,
      TenantId,
      GetAllUsers,
      GetSpecificTenant,
      EditTenant,
      goBack() {
        // return Router.go(-1);
        Router.push("/tenants");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>