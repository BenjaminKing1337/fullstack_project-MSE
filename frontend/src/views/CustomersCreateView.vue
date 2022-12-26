<template>
  <q-page class="page">
    <h4>Welcome to Customers page</h4>
    <p>Here you can create and manage your Customers</p>
    <!-- Create New -->
    <div>
      <form @submit.prevent="NewCustomer()">
        <div class="create-card">
          <div class="title">
            <div class="cardheader"><b>Create New Customer</b></div>
          </div>

          <br />
          <br />
          Personal Info: <br />
          <input
            type="text"
            placeholder="First Name"
            v-model="cState.forename"
          />
          <br />
          <input type="text" placeholder="Last Name" v-model="cState.surname" />
          <br />
          <input type="text" placeholder="Email" v-model="cState.email" />
          <br />
          <input
            type="text"
            placeholder="Company Name"
            v-model="cState.company_name"
          />
          <br />
          <input
            type="text"
            placeholder="Contact Number"
            v-model="cState.contact_number"
          />
          <br />
          <div>Assigned User Login:</div>
          <div>
            <select v-model="cState.user_id">
              <option>None</option>
              <option
                v-for="User in uState.Users"
                :key="User._id"
                :value="User._id"
              >
                {{ User.email }}
              </option>
            </select>
          </div>
          <br />
          <br />
          <q-btn class="q-btn create-btn" type="submit">Add Customer</q-btn>
        </div>
      </form>
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
