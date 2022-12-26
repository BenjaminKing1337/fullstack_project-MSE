
<template>
  <q-page class="page">
   <div class="pageheader">
    <h4>Welcome to Customers menu</h4>
      <router-link to="/newbuilding" class="remove_linkStyle">
        <q-btn class="q-btn"> Create New </q-btn>
      </router-link>
    </div>
    <!-- Show All  -->
    <div>
      <h5>My Customers</h5>
      <div class="grid3x3">
        <div v-for="Customer in cState.Customers" :key="Customer._id">
          <br />
          <div class="show-card">
            <div class="title">
              <div class="cardheader">
                <b>{{ Customer.forename }} {{ Customer.surname }} </b>
              </div>
            </div>
            <br />
            <br />
            <div class="spaced">
              <div>Email:</div>
              <div>{{ Customer.email }} <br /></div>
            </div>
            <div class="spaced">
              <div>Company Name:</div>
              <div>{{ Customer.company_name }} <br /></div>
            </div>
            <div class="spaced">
              <div>Contact Number:</div>
              <div>{{ Customer.contact_number }} <br /></div>
            </div>
            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Customer.user_id === User._id">User Login:</div>
              <div v-if="Customer.user_id === User._id">{{ User.email }}</div>
            </div>
            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Customer.created_by === User._id">Created by:</div>
              <div v-if="Customer.created_by === User._id">
                {{ User.email.split('@')[0] }}
              </div>
            </div>
            <br />
            <div class="show-btns">
              <router-link
                :to="`/customers/${Customer._id}`"
                class="remove_linkStyle"
              >
                <q-btn class="q-btn full-width">
                  <strong>Update</strong>
                </q-btn>
              </router-link>
              <q-btn class="q-btn" @click="DeleteCustomer(Customer._id)">Delete</q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import CustomerCRUD from '../modules/customerCRUD';
import UserCRUD from '../modules/userCRUD';
import { onMounted } from 'vue';
export default {
  setup() {
    const {
      cState,
      Customer,
      GetAllCustomers,
      GetUsersCustomers,
      GetSpecificCustomer,
      NewCustomer,
      DeleteCustomer,
    } = CustomerCRUD();
    const { uState, User, UserId, GetSpecificUser, GetAllUsers } = UserCRUD();

    onMounted(() => {
      GetUsersCustomers();
      GetAllUsers();
    });

    return {
      Customer,
      uState,
      User,
      UserId,
      GetSpecificUser,
      GetAllUsers,
      cState,
      GetAllCustomers,
      GetUsersCustomers,
      GetSpecificCustomer,
      NewCustomer,
      DeleteCustomer,
    };
  },
};
</script>

<style lang="scss" scoped></style>
