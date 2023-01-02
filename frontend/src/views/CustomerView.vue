<template>
  <q-page class="page" align="center">
    <h4>Single Customer's page</h4>
    <p>Here you can edit and manage your individual Customer</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Customer</b></div>
      </div>
      <br />
      <q-form @submit.prevent="EditCustomer" class="q-gutter-xs">
        <div>
          <div class="spaced">
            <div>First Name *</div>
            <q-input
              outlined
              type="text"
              v-model="Customer.forename"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'First Name cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'First Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Last Name *</div>

            <q-input
              outlined
              type="text"
              v-model="Customer.surname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Last Name cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'First Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Email *</div>
            <q-input
              outlined
              type="email"
              v-model="Customer.email"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Email cannot be empty',
                (val) =>
                  val.length > 5 || 'Email must be at least 6 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Company Name</div>

            <q-input
              outlined
              type="text"
              v-model="Customer.company_name"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 2) ||
                  'Company Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Contact Number:</div>
            <q-input
              outlined
              type="text"
              v-model="Customer.contact_number"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 2) ||
                  'Contact Number must be at least 2 characters long',
              ]"
            />
          </div>

          <div class="spaced">
            <div>User ID:</div>
            <q-select
              color="color"
              v-model="Customer.user_id"
              outlined
              :options="uState.UsersFormattedQ"
              map-options
              emit-value
            />
          </div>
        </div>
        <div class="show-btns">
          <q-btn class="q-btn" type="submit">Update</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import CustomerCRUD from "../modules/customerCRUD";
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";
import Utils from "../modules/utils";

export default {
  setup() {
    const { validateNotRequiredField } = Utils();
    const { cState, Customer, CustomerId, GetSpecificCustomer, EditCustomer } =
      CustomerCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();

    GetSpecificCustomer();
    GetUsersUsers();

    const Router = useRouter();

    return {
      uState,
      User,
      UserId,
      cState,
      Customer,
      CustomerId,
      GetUsersUsers,
      GetSpecificCustomer,
      EditCustomer,
      validateNotRequiredField,
      goBack() {
        // return Router.go(-1);
        Router.push("/customers");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
