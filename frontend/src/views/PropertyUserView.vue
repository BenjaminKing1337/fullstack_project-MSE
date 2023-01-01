<template>
  <q-page class="page" align="center">
    <h4>Single Property's page</h4>
    <p>Here you can view your Property info</p>
    <br />
    <div class="show-card">
      <div class="title">
        <div
          class="cardheader"
          v-for="Item in LoggedInTenantsProperty"
          :key="Item._id"
        >
          <b>{{ Item.name }}</b>
        </div>
      </div>
      <br />
      <br />
      <div v-for="Item in LoggedInTenantsProperty" :key="Item._id">
        <div>
          <div
            class="spaced"
            v-for="Building in bState.Buildings"
            :key="Building._id"
            :value="Building._id"
          >
            <div v-if="Item.building_id === Building._id">Building:</div>
            <div v-if="Item.building_id === Building._id">
              {{ Building.name }} {{ Building.number }}
            </div>
          </div>
          <div class="spaced">
            <div>Floor No.:</div>
            <div>{{ Item.floor }}</div>
          </div>
          <div class="spaced">
            <div>Number:</div>
            <div>{{ Item.number }}</div>
          </div>
          <div class="spaced">
            <div>Address:</div>
            <div>{{ Item.address }}</div>
          </div>
          <div class="spaced">
            <div>Postal Code:</div>
            <div>{{ Item.postal_code }}</div>
          </div>
          <div class="spaced">
            <div>Value:</div>
            <div>{{ Item.value }} %</div>
          </div>
          <div class="spaced">
            <div>Bank Note:</div>
            <div>{{ Item.bank_note }}</div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </q-page>
</template>

<script>
import PropertyCRUD from "../modules/propertyCRUD";
import TenantCRUD from "../modules/tenantCRUD";
import BuildingCRUD from "../modules/buildingCRUD";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    const { LoggedInTenantsProperty, GetLoggedInTenantsProperty } =
      PropertyCRUD();
    const { tState, LoggedInTenant, GetLoggedInTenant } = TenantCRUD();
    const { bState, Building, GetAllBuildings } = BuildingCRUD();

    let filterProps = (Properties, tenantId) => {
      let propsFiltered = [];
      for (var i = 0; i < Properties.length; i++) {
        if (
          Properties[i].owner_id == tenantId ||
          Properties[i].renter_id == tenantId
        ) {
          propsFiltered.push(Properties[i]);
        }
      }
      return propsFiltered;
    };
    const TenantId = localStorage.getItem("tenantid");

    onMounted(() => {
      GetLoggedInTenant();
      GetLoggedInTenantsProperty();
      GetAllBuildings();
    });

    const Router = useRouter();

    return {
      bState,
      Building,
      GetAllBuildings,
      tState,
      LoggedInTenant,
      TenantId,
      GetLoggedInTenant,
      filterProps,
      LoggedInTenantsProperty,
      GetLoggedInTenantsProperty,
      goBack() {
        Router.push("/properties");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
