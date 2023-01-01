<template>
  <q-page class="page">
    <div class="pageheader">
      <h4>Welcome to Properties menu</h4>
      <router-link to="/newproperty" class="remove_linkStyle">
        <q-btn class="q-btn"> Create New </q-btn>
      </router-link>
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
                <b>{{ Property.name }} &nbsp;</b>
              </div>
              <div class="cardheader" style="float: right">
                <span v-if="bState.Buildings.length > 0"
                  ><q-icon :name="getPropertyIcon(Property.building_id)"
                /></span>
              </div>
            </div>
            <br />
            <br />
            <div class="spaced">
              <div>Floor No.:</div>
              <div>{{ Property.floor ? Property.floor : ''}}</div>
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
              <div>{{ Property.value }} %</div>
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

            <div
              class="spaced"
              v-for="Building in bState.Buildings"
              :key="Building._id"
              :value="Building._id"
            >
              <div v-if="Property.building_id === Building._id">
                Building:
              </div>
              <div v-if="Property.building_id === Building._id">
                {{ Building.name }} {{ Building.number }}
              </div>
            </div>
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
                <q-btn class="q-btn full-width">
                  <strong>Update</strong>
                </q-btn>
              </router-link>
              <q-btn class="q-btn" @click="DeleteProperty(Property._id)"
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
import PropertyCRUD from "../modules/propertyCRUD";
import UserCRUD from "../modules/userCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const { pState, GetUsersProperties, DeleteProperty } = PropertyCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();
    const { tState, Tenant, GetUsersTenants } = TenantCRUD();
    const { bState, Building, GetUsersBuildings } = BuildingCRUD();

    onMounted(() => {
      GetUsersProperties();
      GetUsersUsers();
      GetUsersTenants();
      GetUsersBuildings();
    });

    const getPropertyIcon = (buildingId) => {
      const buildingsObj = ref();
      let aux = ref();
      aux.value = bState.value.Buildings;
      let propertyIcon = "";
      buildingsObj.value = aux.value.filter((b) => buildingId == b._id);
      buildingsObj.value.length > 0
        ? (propertyIcon = "apartment")
        : (propertyIcon = "home");
      return propertyIcon;
    };

    return {
      bState,
      Building,
      GetUsersBuildings,
      tState,
      Tenant,
      GetUsersTenants,
      uState,
      User,
      UserId,
      GetUsersUsers,
      pState,
      GetUsersProperties,
      DeleteProperty,
      getPropertyIcon,
    };
  },
};
</script>

<style lang="scss" scoped></style>
