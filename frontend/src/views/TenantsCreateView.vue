<template>
  <q-page class="page">
    <h4>Welcome to Tenants page</h4>
    <p>Here you can create and manage your Tenants</p>
    <!-- Create New -->
    <div>
      <q-form @submit.prevent="NewTenant()" class="q-gutter-xs">
        <div class="create-card">
          <div class="title">
            <div class="cardheader"><b>Create New Tenant</b></div>
          </div>
          <br />
          Type: <br />
          <q-select
            v-model="tState.type"
            outlined
            :options="tenantTypeOptions"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Type cannot be empty',
            ]"
          />
          <br />
          Personal Info: <br />
          <q-input
            outlined
            type="text"
            label="First Name"
            v-model="tState.forename"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'First Name cannot be empty',
              (val) =>
                val.length > 1 ||
                'First Name must be at least 2 characters long',
            ]"
          />
          <q-input
            outlined
            type="text"
            label="Last Name"
            v-model="tState.surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Last Name cannot be empty',
              (val) =>
                val.length > 1 ||
                'First Name must be at least 2 characters long',
            ]"
          />
          <q-input
            outlined
            type="email"
            label="Email"
            v-model="tState.email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Email cannot be empty',
              (val) =>
                val.length > 5 || 'Email must be at least 6 characters long',
            ]"
          />
          <!-- FIXME  -->
          <q-input
            outlined
            type="text"
            label="Phone Number"
            v-model="tState.phone_number"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Phone Number cannot be empty',
              (val) =>
                val.length > 1 ||
                'Phone Number must be at least 2 characters long',
            ]"
          />
          <!-- FIXME  -->
          <q-input
            outlined
            type="text"
            label="Account Number"
            v-model="tState.account_number"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Account Number cannot be empty',
              (val) =>
                val.length > 1 ||
                'Account Number must be at least 2 characters long',
            ]"
          />
          <q-input
            outlined
            type="number"
            label="Number of Keys"
            v-model.number="tState.keys_number"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Number of Keys cannot be empty',
              (val) =>
                (val > 0 && val < 11) ||
                'Number of Keys must be between 1 and 10',
            ]"
          />
          <q-input
            outlined
            type="text"
            label="Closest Neighbour"
            v-model="tState.closest_neighbour"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Closest Neighbour cannot be empty',
              (val) =>
                val.length > 1 ||
                'Closest Neighbour must be at least 2 characters long',
            ]"
          />
          <!-- FIXME  -->
          <q-input outlined type="text" label="Lease" v-model="tState.lease" />
          <br />
          <div>Assigned User Login:</div>
          <div>
            <q-select
              v-model="tState.user_id"
              outlined
              :options="uState.UsersFormattedQ"
              map-options
              emit-value
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Assigned User Id cannot be empty',
              ]"
            />
          </div>
          <br />
          Move In Date: <br />
          <q-input
            outlined
            type="date"
            v-model="tState.move_in"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Move In Date cannot be empty',
            ]"
          />
          <br />
          Move Out Date: <br />
          <q-input
            outlined
            type="date"
            v-model="tState.move_out"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Move Out Date cannot be empty',
            ]"
          />
          <br />
          <br />
          <q-btn class="q-btn create-btn" type="submit">Add Tenant</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
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
    const tenantTypeOptions = ["Owner", "Renter"];

    onMounted(() => {
      GetUsersTenants();
      // GetSpecificUser();
      GetAllUsers();
      // GetAllTenants();
      // Set default value of dropdowns
      tState.value.type = "Owner";
      tState.value.user_id = "None";
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
      tenantTypeOptions,
    };
  },
};
</script>

<style lang="scss" scoped></style>
