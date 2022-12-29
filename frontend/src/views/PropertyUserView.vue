<template>
  <q-page class="page">
    <h4>Single Property's page</h4>
    <p>Here you can view your Property info</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>My Property</b></div>
      </div>
      <br />
      <br />
      <div
        v-for="Property in filterProps(pState.Properties, TenantId)"
        :key="Property._id"
      >
        <div>
          ID: {{ Property._id }} <br />
          Name: {{ Property.name }} <br />
          Address: {{ Property.address }}
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
    const {
      pState,
      Property,
      PropertyId,
      GetUsersProperties,
      GetSpecificProperty,
      EditProperty,
    } = PropertyCRUD();
    const { tState, LoggedInTenant, /* TenantId, */ GetLoggedInTenant } =
      TenantCRUD();
    const { bState, Building, GetUsersBuildings } = BuildingCRUD();

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
      GetSpecificProperty();
      GetUsersProperties();
    });

    const Router = useRouter();

    return {
      bState,
      Building,
      GetUsersBuildings,
      tState,
      LoggedInTenant,
      TenantId,
      pState,
      Property,
      PropertyId,
      GetLoggedInTenant,
      GetUsersProperties,
      GetSpecificProperty,
      EditProperty,
      filterProps,
      goBack() {
        // return Router.go(-1);
        Router.push("/properties");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
