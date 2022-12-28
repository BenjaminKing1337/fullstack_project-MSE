<template>
  <q-page class="page" align="center">
    <h4>Single Customer's page</h4>
    <p>Here you can edit and manage your individual Customer</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Customer</b></div>
      </div>
      <br />
      <form @submit.prevent="EditCustomer">
        <div>
          <div class="spaced">
            <div>First Name:</div>
            <input
              type="text"
              placeholder="First Name"
              v-model="Customer.forename"
            />
          </div>
          <div class="spaced">
            <div>Last Name:</div>
            <input
              type="text"
              placeholder="Last Name"
              v-model="Customer.surname"
            />
          </div>
          <div class="spaced">
            <div>Email:</div>
            <input type="text" placeholder="Email" v-model="Customer.email" />
          </div>
          <div class="spaced">
            <div>Company Name:</div>
            <input
              type="text"
              placeholder="Email"
              v-model="Customer.company_name"
            />
          </div>
          <div class="spaced">
            <div>Contact Number:</div>
            <input
              type="text"
              placeholder="Email"
              v-model="Customer.contact_number"
            />
          </div>

          <div class="spaced">
            <div>User ID:</div>
            <select v-model="Customer.user_id">
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
          <q-btn class="q-btn" type="submit">Update</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </form>
    </div>
  </q-page>
</template>

<script>
import CustomerCRUD from '../modules/customerCRUD';
import UserCRUD from '../modules/userCRUD';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const {
      cState,
      Customer,
      CustomerId,
      GetSpecificCustomer,
      EditCustomer,
    } = CustomerCRUD();
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
      goBack() {
        // return Router.go(-1);
        Router.push('/customers');
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
