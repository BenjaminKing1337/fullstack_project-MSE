<template>
  <q-page class="page" align="center">
    <h4>Personal Info</h4>
    <p>Here you can view your info as a tenant</p>

    <div class="show-card">
      <div class="title">
        <div class="cardheader">
          <b>{{ LoggedInTenant.email }}</b>
        </div>
      </div>
      <br />
      <br />
      <div class="spaced">
        <div>Name:</div>
        <div>{{ LoggedInTenant.forename }} {{ LoggedInTenant.surname }}</div>
      </div>
      <div class="spaced">
        <div>Phone:</div>
        {{ LoggedInTenant.phone_number }}
      </div>
      <div class="spaced">
        <div>Account:</div>
        {{ LoggedInTenant.account_number }}
      </div>
      <div class="spaced">
        <div>Number of Keys:</div>
        {{ LoggedInTenant.keys_number }}
      </div>
      <div class="spaced">
        <div>Closest Neighbour:</div>
        {{ LoggedInTenant.closest_neighbour }}
      </div>
      <div class="spaced">
        <div>Move In Date:</div>
        {{ LoggedInTenant.move_in ? LoggedInTenant.move_in.slice(0, 10) : [] }}
      </div>
      <div class="spaced">
        <div>Move out Date:</div>
        {{
          LoggedInTenant.move_out ? LoggedInTenant.move_out.slice(0, 10) : []
        }}
      </div>
      <div class="show-btns bg2" style="padding: 0 5px; border-radius: 5px">
        <b>
          {{ LoggedInTenant.type }}
        </b>
        <br />
      </div>
      <br />
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