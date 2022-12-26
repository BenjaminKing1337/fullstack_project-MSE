<template>
  <q-page class="page">
    <h4>Welcome to Tenants page</h4>
    
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
              <div v-if="Tenant.created_by === User._id">
                {{ User.email.split("@")[0] }}
              </div>
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
