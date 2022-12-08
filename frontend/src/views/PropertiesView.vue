<template>
  <body>
    <h4>Welcome to Properties page</h4>
    <p>Here you can create and manage your Properties</p>
    <!-- Create New -->
    <div class="create-card">
      <div class="title">
        <div class="cardheader">Create new Property</div>
      </div>
      <br />
      <input placeholder="Name" v-model="pState.name" /> <br />
      <input placeholder="Floor" v-model="pState.floor" /> <br />
      <input placeholder="Number" v-model="pState.number" /> <br />
      <input placeholder="Address" v-model="pState.address" /> <br />
      <input placeholder="Postal Code" v-model="pState.postal_code" /> <br />
      <input placeholder="Value" v-model="pState.value" /> <br />
      <input placeholder="Bank Note" v-model="pState.bank_note" /> <br />
      <!-- Building ID: <input
            v-model="pState.building_id"
          /> -->

      <div>
        <br />
        Add Tenants:
        <br />
        <div>
          Assign Owner:
          <select v-model="pState.owner_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div>{{ Tenant.forename }} {{ Tenant.surname }}</div>
              <br />
            </option>
          </select>
        </div>
        <div>
          Assign Renter:
          <select v-model="pState.renter_id">
            <option>None</option>
            <option
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div>{{ Tenant.forename }} {{ Tenant.surname }}</div>
            </option>
          </select>
        </div>
      </div>
      <br />
      <div>
        <button class="create-btn" @click="NewProperty()">
          Create New Property
        </button>
      </div>
    </div>
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
              <div v-if="Property.renter_id === Tenant._id">Renter ID:</div>
              <div v-if="Property.renter_id === Tenant._id">
                {{ Tenant.forename }} {{ Tenant.surname }}
              </div>
            </div>
            <div
              class="spaced"
              v-for="Tenant in tState.Tenants"
              :key="Tenant._id"
              :value="Tenant._id"
            >
              <div v-if="Property.owner_id === Tenant._id">Owner ID:</div>
              <div v-if="Property.owner_id === Tenant._id">
                {{ Tenant.forename }} {{ Tenant.surname }}
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
  </body>
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
