<template>
  <body>
    <h4>Single Tenant's page</h4>
    <p>Here you can edit and manage your individual Tenant</p>

    <div>
        
      <form @submit.prevent="EditTenant">
      <div style="border: 1px solid black; border-radius: 15px">
        ID:&nbsp;&nbsp;
Type:&nbsp;&nbsp;<input type="text" placeholder="Type" v-model="Tenant.type" /><br />
First Name:&nbsp;&nbsp;<input type="text" placeholder="First Name" v-model="Tenant.forename" /><br />
Last Name:&nbsp;&nbsp;<input type="text" placeholder="Last Name" v-model="Tenant.surname" /><br />
Email:&nbsp;&nbsp;<input type="text" placeholder="Email" v-model="Tenant.email" /><br />
Phone no:&nbsp;&nbsp;<input type="text" placeholder="Phone Number" v-model="Tenant.phone_number" /><br />
Number of Keys:&nbsp;&nbsp;<input type="text" placeholder="Number of Keys" v-model="Tenant.keys_number" /><br />
Closest Neighbour:&nbsp;&nbsp;<input type="text" placeholder="Closest Neighbour" v-model="Tenant.closest_neighbour" /><br />
Account Number:&nbsp;&nbsp;<input type="text" placeholder="Account Number" v-model="Tenant.account_number" /><br />
Move In:&nbsp;&nbsp;<input type="text" placeholder="Move In Date" v-model="Tenant.move_in" /><br />
Move Out:&nbsp;&nbsp;<input type="text" placeholder="Move Out Date" v-model="Tenant.move_out" /><br />
Lease:&nbsp;&nbsp;<input type="text" placeholder="Lease" v-model="Tenant.lease" /><br />
User ID: &nbsp;&nbsp;<select v-model="Tenant.user_id">
              <option
                v-for="User in uState.Users"
                :key="User._id"
                :value="User._id"
              >
               {{ User.email }}
              </option>
            </select>
      </div>
        <button type="submit">Update</button>
      </form>
      <button type="button" @click="goBack()">Back</button>
    </div>

  </body>
</template>

<script>
import TenantCRUD from "../modules/tenantCRUD";
import UserCRUD from "../modules/userCRUD";
import { useRouter } from "vue-router";

export default {
  setup() {
    const {
      tState,
      Tenant,
      TenantId,
      // GetAllTenants,
      GetSpecificTenant,
      EditTenant,
    } = TenantCRUD();
    const {
      uState,
      User,
      UserId,
      GetAllUsers
    } = UserCRUD();

    GetSpecificTenant();
    GetAllUsers();

    
    console.log(Tenant.value);

    const Router = useRouter();

    return {
      uState,
      User,
      UserId,
      tState,
      Tenant,
      TenantId,
      GetAllUsers,
      GetSpecificTenant,
      EditTenant,
      goBack() {
        // return Router.go(-1);
        Router.push("/tenants");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>