<template>
  <q-page class="page">
    <h4>My Profile</h4>
    <p>Here you can view your info as a tenant</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader">My Info</div>
      </div>
      <br />
      <br />
      Logged In Tenant: <br />
      Name: {{ LoggedInTenant.forename }} {{ LoggedInTenant.surname }} <br />
      LoginID: {{ LoggedInTenant.user_id }}
      <br />
      <!-- {{ LoggedInTenant._id }} 
      <br />
      {{ TenantId }}
      <br /> -->
    </div>
  </q-page>
</template>

<script>
import TenantCRUD from "../modules/tenantCRUD";

export default {
  setup() {
    const { tState, LoggedInTenant, GetLoggedInTenant } = TenantCRUD();

    const TenantId = localStorage.getItem("tenantid");

    GetLoggedInTenant();

    return {
      tState,
      LoggedInTenant,
      TenantId,
      GetLoggedInTenant,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>