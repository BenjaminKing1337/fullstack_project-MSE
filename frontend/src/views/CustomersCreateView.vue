<template>
  <q-page class="page" align="center">
    <div class="pageheader">
      <div>
        <h4>Welcome to Customers page</h4>
        <p align="left">Here you can create and manage your Customers</p>
      </div>
      <router-link to="/customers" class="remove_linkStyle">
        <q-btn class="q-btn"> View All </q-btn>
      </router-link>
    </div>
    <br />
    <!-- Create New -->
    <div>
      <q-form @submit.prevent="NewCustomer()" class="q-gutter-xs">
        <div class="create-card">
          <div class="title">
            <div class="cardheader"><b>Create New Customer</b></div>
          </div>
          <br />
          <br />
          Personal Info: <br />
          <q-input
            outlined
            type="text"
            label="First Name *"
            v-model="cState.forename"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'First Name cannot be empty',
              (val) =>
                val.length > 1 ||
                'First Name must be at least 2 characters long',
            ]"
          />
          <br />
          <q-input
            outlined
            type="text"
            label="Last Name *"
            v-model="cState.surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Last Name cannot be empty',
              (val) =>
                val.length > 1 ||
                'First Name must be at least 2 characters long',
            ]"
          />
          <br />
          <q-input
            outlined
            type="email"
            label="Email *"
            v-model="cState.email"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Email cannot be empty',
              (val) =>
                val.length > 5 || 'Email must be at least 6 characters long',
            ]"
          />
          <br />
          <q-input
            outlined
            type="text"
            label="Company Name"
            v-model="cState.company_name"
            lazy-rules
            :rules="[
              (val) =>
                validateNotRequiredField(val, 2) ||
                'Company Name must be at least 2 characters long',
            ]"
          />
          <br />
          <q-input
            outlined
            type="text"
            label="Contact Number"
            v-model="cState.contact_number"
            lazy-rules
            :rules="[
              (val) =>
                validateNotRequiredField(val, 2) ||
                'Contact Number must be at least 2 characters long',
            ]"
          />
          <br />
          <div>Assigned User Login:</div>
          <div>
            <q-select
              color="color"
              v-model="cState.user_id"
              outlined
              :options="uState.UsersFormattedQ"
              map-options
              emit-value
            />
          </div>
          <br />
          <br />
          <q-btn class="q-btn create-btn" type="submit">Add Customer</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import CustomerCRUD from "../modules/customerCRUD";
import UserCRUD from "../modules/userCRUD";
import { onMounted } from "vue";
import Utils from "../modules/utils";

export default {
  setup() {
    const { validateNotRequiredField } = Utils();
    const { cState, Customer, NewCustomer } = CustomerCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();
    onMounted(() => {
      GetUsersUsers();
    });

    return {
      uState,
      User,
      UserId,
      GetUsersUsers,
      cState,
      Customer,
      NewCustomer,
      validateNotRequiredField,
    };
  },
};
</script>

<style lang="scss" scoped></style>
