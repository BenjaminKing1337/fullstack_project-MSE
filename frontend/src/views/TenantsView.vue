<template>
  <q-page class="page">
    <div class="pageheader">
      <h4>Welcome to Tenants menu</h4>
      <router-link to="/newtenant" class="remove_linkStyle">
        <q-btn class="q-btn"> Create New </q-btn>
      </router-link>
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
            <div class="spaced">
              <div>Type:</div>
              <div>{{ Tenant.type }} <br /></div>
            </div>
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
              <div>
                {{ Tenant.move_out ? Tenant.move_out.slice(0, 10) : "" }} <br />
              </div>
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
                <q-btn class="q-btn full-width">
                  <strong>Update</strong>
                </q-btn>
              </router-link>
              <q-btn class="q-btn" @click="DeleteTenant(Tenant._id)"
                >Delete</q-btn
              >
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
    const { tState, Tenant, GetUsersTenants, DeleteTenant } = TenantCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();

    onMounted(() => {
      GetUsersTenants();
      GetUsersUsers();
    });

    return {
      uState,
      User,
      UserId,
      GetUsersUsers,
      tState,
      Tenant,
      GetUsersTenants,
      DeleteTenant,
    };
  },
};
</script>

<style lang="scss" scoped></style>
