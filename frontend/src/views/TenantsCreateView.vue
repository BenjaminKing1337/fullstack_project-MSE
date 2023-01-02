<template>
  <q-page class="page" align="center">
    <div class="pageheader">
      <div>
        <h4>Welcome to Tenants page</h4>
        <p align="left">Here you can create and manage your Tenants</p>
      </div>
      <router-link to="/tenants" class="remove_linkStyle">
        <q-btn class="q-btn"> View All </q-btn>
      </router-link>
    </div>
    <br />
    <!-- Create New -->
    <q-form @submit.prevent="NewTenant()" class="q-gutter-xs">
      <div class="create-card">
        <div class="title">
          <div class="cardheader"><b>Create New Tenant</b></div>
        </div>
        <br />
        Type * <br />
        <q-select
          color="color"
          v-model="tState.type"
          outlined
          :options="tenantTypeOptions"
        />
        Personal Info <br /><br />
        <q-input
          outlined
          type="text"
          label="First Name *"
          v-model="tState.forename"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'First Name cannot be empty',
            (val) =>
              val.length > 1 || 'First Name must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Last Name *"
          v-model="tState.surname"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Last Name cannot be empty',
            (val) =>
              val.length > 1 || 'First Name must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="email"
          label="Email"
          v-model="tState.email"
          lazy-rules
          :rules="[
            (val) =>
              validateNotRequiredField(val, 6) ||
              'Email must be at least 6 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Phone Number"
          v-model="tState.phone_number"
          lazy-rules
          :rules="[
            (val) =>
              validateNotRequiredField(val, 2) ||
              'Phone Number must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Account Number *"
          v-model="tState.account_number"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Account Number cannot be empty',
            (val) =>
              val.length > 2 ||
              'Account Number must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="number"
          label="Number of Keys *"
          v-model.number="tState.keys_number"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Number of Keys cannot be empty',
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
              validateNotRequiredField(val, 2) ||
              'Closest Neighbour must be at least 2 characters long',
          ]"
        />
        <q-input
          outlined
          type="text"
          label="Lease"
          v-model="tState.lease"
          lazy-rules
          :rules="[
            (val) =>
              validateNotRequiredField(val, 2) ||
              'Lease must be at least 2 characters long',
          ]"
        />
        <br />
        <div>Assigned User Login</div>
        <div>
          <q-select
            color="color"
            v-model="tState.user_id"
            outlined
            :options="uState.UsersFormattedQ"
            map-options
            emit-value
          />
        </div>
        <br />
        Move In Date * <br />
        <q-input
          outlined
          type="date"
          v-model="tState.move_in"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Move In Date cannot be empty',
          ]"
        />
        <br />
        Move Out Date<br />
        <q-input outlined type="date" v-model="tState.move_out" />
        <br />
        <br />
        <q-btn class="q-btn create-btn" type="submit">Add Tenant</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import TenantCRUD from "../modules/tenantCRUD";
import UserCRUD from "../modules/userCRUD";
import { onMounted } from "vue";
import Utils from "../modules/utils";

export default {
  setup() {
    const { validateNotRequiredField } = Utils();
    const { tState, Tenant, NewTenant } = TenantCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();
    const tenantTypeOptions = ["Owner", "Renter"];
    onMounted(() => {
      GetUsersUsers();
      // Set default value of dropdowns
      tState.value.type = "Owner";
      tState.value.user_id = "None";
    });

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
      uState,
      User,
      UserId,
      GetUsersUsers,
      tState,
      Tenant,
      NewTenant,
      tenantTypeOptions,
      validateNotRequiredField,
      filterCreatedBy,
      created_by,
    };
  },
};
</script>

<style lang="scss" scoped></style>
