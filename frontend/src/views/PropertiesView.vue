<template>
  <q-page class="page">
    <h4>Welcome to Properties page</h4>
    
    <!-- Show All -->
    <div>
      <h5>My Properties</h5>
      <div class="grid3x3">
        <div v-for="Property in pState.Properties" :key="Property._id">
          <br />
          <div class="show-card">
            <div class="title">
              <div class="cardheader">
                <b>{{ Property.name }}</b>
              </div>
            </div>
            <br />
            <br />
            <!-- <div class="spaced">
              <div>ID:</div>
              <div>{{ Property._id }}</div>
            </div> -->
            <!-- <div class="spaced">
              <div>Name:</div>
              <div>{{ Property.name }}</div>
            </div> -->
            <div class="spaced">
              <div>Floor No.:</div>
              <div>{{ Property.floor }}</div>
            </div>
            <div class="spaced">
              <div>Number:</div>
              <div>{{ Property.number }}</div>
            </div>
            <div class="spaced">
              <div>Address:</div>
              <div>{{ Property.address }}</div>
            </div>
            <div class="spaced">
              <div>Postal Code:</div>
              <div>{{ Property.postal_code }}</div>
            </div>
            <div class="spaced">
              <div>Value:</div>
              <div>{{ Property.value }}</div>
            </div>
            <div class="spaced">
              <div>Bank Note:</div>
              <div>{{ Property.bank_note }}</div>
            </div>
            <div
              class="spaced"
              v-for="User in uState.Users"
              :key="User._id"
              :value="User._id"
            >
              <div v-if="Property.created_by === User._id">Created by:</div>
              <div v-if="Property.created_by === User._id">
                {{ User.email.split("@")[0] }}
              </div>
            </div>
            <!-- <div class="spaced"
              v-for="Building in bState.Buildings"
              :key="Building._id"
              :value="Building._id"
            >
              <div v-if="Property.building_id === Tenant._id">Building ID:</div>
              <div v-if="Property.building_id === Tenant._id">
                {{ Building._id }}
              </div>
            </div> -->
            <div
              class="spaced"
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div v-if="Property.renter_id === Tenant._id">Renter:</div>
              <div v-if="Property.renter_id === Tenant._id">
                {{ Tenant.forename }} {{ Tenant.surname }}
              </div>
            </div>
            <div v-if="Property.renter_id === 'None'">
              <div class="spaced">
                <div>Renter:</div>
                <div>None</div>
              </div>
            </div>
            <div
              class="spaced"
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div v-if="Property.owner_id === Tenant._id">Owner:</div>
              <div v-if="Property.owner_id === Tenant._id">
                {{ Tenant.forename }} {{ Tenant.surname }}
              </div>
            </div>
            <div v-if="Property.owner_id === 'None'">
              <div class="spaced">
                <div>Owner:</div>
                <div>None</div>
              </div>
            </div>
            <br />
            <div class="show-btns">
              <router-link
                :to="`/properties/${Property._id}`"
                class="remove_linkStyle"
              >
                <button class="full-width">
                  <strong>Update</strong>
                </button>
              </router-link>
              <button @click="DeleteProperty(Property._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import UserCRUD from "../modules/userCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import { onMounted } from "vue";
export default {
  setup() {
    const {
      pState,
      GetAllProperties,
      GetUsersProperties,
      GetSpecificProperty,
      NewProperty,
      DeleteProperty,
    } = PropertyCRUD();
    const { uState, User, UserId, GetSpecificUser, GetAllUsers } = UserCRUD();
    const { tState, Tenant, GetAllTenants } = TenantCRUD();

    onMounted(() => {
      GetUsersProperties();
      // GetSpecificUser();
      GetAllUsers();
      GetAllTenants();
    });

    return {
      tState,
      Tenant,
      GetAllTenants,
      uState,
      User,
      UserId,
      GetSpecificUser,
      GetAllUsers,
      pState,
      GetAllProperties,
      GetUsersProperties,
      GetSpecificProperty,
      NewProperty,
      DeleteProperty,
    };
  },
};
</script>

<style lang="scss" scoped></style>
