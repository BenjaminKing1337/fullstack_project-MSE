<template>
  <q-page class="page" align="center">
    <h4>Single Tenant's page</h4>
    <p>Here you can edit and manage your individual Tenant</p>
    <div class="show-card">
      <div class="title">
        <div class="cardheader"><b>Update Tenant</b></div>
      </div>
      <br />
      <q-form @submit.prevent="EditTenant" class="q-gutter-xs">
        <div>
          <!-- <div class="spaced">
            <div>ID:</div>
            {{ Tenant._id }}
          </div> -->
          <div class="spaced">
            <div>Type *</div>
            <div>
              <q-select
                v-model="Tenant.type"
                outlined
                :options="tenantTypeOptions"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Type cannot be empty',
                ]"
              />
            </div>
          </div>
          <div class="spaced">
            <div>First Name *</div>
            <q-input
              outlined
              type="text"
              v-model="Tenant.forename"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'First Name cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'First Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Last Name *</div>
            <!-- <input
              type="text"
              placeholder="Last Name"
              v-model="Tenant.surname"
            /> -->
            <q-input
              outlined
              type="text"
              v-model="Tenant.surname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Last Name cannot be empty',
                (val) =>
                  val.length > 1 ||
                  'First Name must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Email</div>
            <q-input
              outlined
              type="email"
              v-model="Tenant.email"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 6) ||
                  'Email must be at least 6 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Phone no.</div>
            <q-input
              outlined
              type="text"
              v-model="Tenant.phone_number"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 2) ||
                  'Phone Number must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Number of Keys *</div>
            <q-input
              outlined
              type="number"
              v-model.number="Tenant.keys_number"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Number of Keys cannot be empty',
                (val) =>
                  (val > 0 && val < 11) ||
                  'Number of Keys must be between 1 and 10',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Closest Neighbour</div>
            <q-input
              outlined
              type="text"
              v-model="Tenant.closest_neighbour"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 2) ||
                  'Closest Neighbour must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Account Number *</div>
            <q-input
              outlined
              type="text"
              v-model="Tenant.account_number"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Account Number cannot be empty',
                (val) =>
                  val.length > 2 ||
                  'Account Number must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Move In *</div>
            <q-input
              outlined
              type="date"
              v-model="Tenant.move_in_formatted"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Move In Date cannot be empty',
              ]"
            />
            <br />
          </div>
          <div class="spaced">
            <div>Move Out *</div>
            <q-input
              outlined
              type="date"
              v-model="Tenant.move_out_formatted"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Move Out Date cannot be empty',
              ]"
            />
          </div>
          <div class="spaced">
            <div>Lease</div>
            <q-input
              outlined
              type="text"
              v-model="Tenant.lease"
              lazy-rules
              :rules="[
                (val) =>
                  validateNotRequiredField(val, 2) ||
                  'Lease must be at least 2 characters long',
              ]"
            />
          </div>
          <div class="spaced">
            <div>User ID</div>
            <div>
              <q-select
                v-model="Tenant.user_id"
                outlined
                :options="uState.UsersFormattedQ"
                map-options
                emit-value
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Assigned User Id cannot be empty',
                ]"
              />
            </div>
          </div>
        </div>
        <div class="show-btns">
          <q-btn class="q-btn" type="submit">Update</q-btn>
          <q-btn class="q-btn" type="button" @click="goBack()">Back</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import TenantCRUD from "../modules/tenantCRUD";
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";
import Utils from "../modules/utils";
export default {
  setup() {
    const { validateNotRequiredField } = Utils();
    const {
      tState,
      Tenant,
      TenantId,
      // GetAllTenants,
      GetSpecificTenant,
      EditTenant,
    } = TenantCRUD();
    const { uState, User, UserId, GetUsersUsers } = UserCRUD();

    GetSpecificTenant();
    GetUsersUsers();
    const tenantTypeOptions = ["Owner", "Renter"];
    const formatFromISO = (date) => {
      const formattedDate = new Date(date);
      return formattedDate;
    };
    const Router = useRouter();

    return {
      uState,
      User,
      UserId,
      tState,
      Tenant,
      TenantId,
      GetUsersUsers,
      GetSpecificTenant,
      EditTenant,
      tenantTypeOptions,
      validateNotRequiredField,
      formatFromISO,
      goBack() {
        // return Router.go(-1);
        Router.push("/tenants");
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
