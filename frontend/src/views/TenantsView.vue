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
          Type:
          <select v-model="tState.type">
            <option>Owner</option>
            <option>Renter</option>
          </select>
          <br />
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
          <input
            type="text"
            placeholder="Account Number"
            v-model="tState.account_number"
          />
          <br />
          <input
            type="date"
            placeholder="Move In Date"
            v-model="tState.move_in"
          />
          <br />
          <input
            type="date"
            placeholder="Move Out Date"
            v-model="tState.move_out"
          />
          <br />
          <input type="text" placeholder="Lease" v-model="tState.lease" />
          <br />
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
          </div>
          <br />
          <button class="create-btn" type="submit">Add Tenant</button>
        </div>
      </form>
    </div>
    <!-- Show All  -->
    <div>
      <h5>My Tenants</h5>
      <div class="grid3x3">
        <div v-for="Tenant in tState.Tenants" :key="Tenant._id">
          <br />
          <div class="show-card">
            <div class="title">
              <div class="cardheader">
                <b>{{ Tenant.forename }} {{ Tenant.surname }} </b>
              </div>
            </div>
            <br />
            <br />
            <!-- <div class="spaced">
            <div>ID:</div>
            <div>{{ Tenant._id }} <br /></div>
          </div> -->
            <div class="spaced">
              <div>Type:</div>
              <div>{{ Tenant.type }} <br /></div>
            </div>
            <!-- <div class="spaced">
              <div>First Name:</div>
              <div>{{ Tenant.forename }} <br /></div>
            </div> -->
            <!-- <div class="spaced">
              <div>Last Name:</div>
              <div>{{ Tenant.surname }} <br /></div>
            </div> -->
            <div class="spaced">
              <div>Email:</div>
              <div>{{ Tenant.email }} <br /></div>
            </div>
            <div class="spaced">
              <div>Phone no:</div>
              <div>{{ Tenant.phone_number }} <br /></div>
            </div>
            <div class="spaced">
              <div>Number of Keys:</div>
              <div>{{ Tenant.keys_number }} <br /></div>
            </div>
            <div class="spaced">
              <div>Closest Neighbour:</div>
              <div>{{ Tenant.closest_neighbour }} <br /></div>
            </div>
            <div class="spaced">
              <div>Account Number:</div>
              <div>{{ Tenant.account_number }} <br /></div>
            </div>
            <div class="spaced">
              <div>Move In:</div>
              <div>{{ Tenant.move_in.slice(0, 10) }} <br /></div>
            </div>
            <div class="spaced">
              <div>Move Out:</div>
              <div>{{ Tenant.move_out.slice(0, 10) }} <br /></div>
            </div>
            <div class="spaced">
              <div>Lease:</div>
              <div>{{ Tenant.lease }} <br /></div>
            </div>
            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Tenant.user_id === User._id">User Login:</div>
              <div v-if="Tenant.user_id === User._id">{{ User.email }}</div>
            </div>
            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Tenant.created_by === User._id">Created by:</div>
              <div v-if="Tenant.created_by === User._id">{{ User.email.split('@')[0] }}</div>
            </div>
            <br />
            <div class="show-btns">
              <router-link
                :to="`/tenants/${Tenant._id}`"
                class="remove_linkStyle"
              >
                <button class="full-width">
                  <strong>Update</strong>
                </button>
              </router-link>
              <button @click="DeleteTenant(Tenant._id)">Delete</button>
            </div>
          </div>
        </div>
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
