import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";
import UserCRUD from "./userCRUD";

const GetTenants = () => {
  const Route = useRoute();
  const Router = useRouter();
  const TenantId = computed(() => Route.params.id);
  const { User } = UserCRUD();

  const tState = ref({
    type: "",
    forename: "",
    surname: "",
    email: "",
    phone_number: "",
    keys_number: "",
    closest_neighbour: "",
    account_number: "",
    move_in: "",
    move_out: "",
    lease: "",
    user_id: "",
    customer_id:localStorage.getItem('userid'),
    Tenants: {},
  });


  // GET ALL 
  const GetAllTenants = async () => {
    try {
      await fetch(baseURL + "/tenants")
        .then((Res) => Res.json())
        .then((Data) => {
          tState.value.Tenants = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const GetUsersTenants = async () => {
    try {
      await fetch(baseURL + "/tenants/get/byUser/" + localStorage.getItem('userid'))
        .then((Res) => Res.json())
        .then((Data) => {
          tState.value.Tenants = Data;
        })
    } catch (Error) {
      console.log(Error);
    }
  };

  // CREATE NEW 
  const NewTenant = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: tState.value.type,
        forename: tState.value.forename,
        surname: tState.value.surname,
        email: tState.value.email,
        phone_number: tState.value.phone_number,
        keys_number: tState.value.keys_number,
        closest_neighbour: tState.value.closest_neighbour,
        account_number: tState.value.account_number,
        move_in: tState.value.move_in,
        move_out: tState.value.move_out,
        lease: tState.value.lease,
        user_id: tState.value.user_id,
        customer_id: tState.value.customer_id,
      }),
    };
    fetch(baseURL + "/tenants/new", RequestOptions)
      // GetAllTenants()
      .then(() => {
        GetAllTenants(); // Updates page
      });
  };

  // DELETE BY ID
  const DeleteTenant = (_id) => {
    fetch(baseURL + "/tenants/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllTenants(); // Updates page
    });
  };

  // UPDATE BY ID
  const EditTenant = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: Tenant.value.type,
        forename: Tenant.value.forename,
        surname: Tenant.value.surname,
        email: Tenant.value.email,
        phone_number: Tenant.value.phone_number,
        keys_number: Tenant.value.keys_number,
        closest_neighbour: Tenant.value.closest_neighbour,
        account_number: Tenant.value.account_number,
        move_in: Tenant.value.move_in,
        move_out: Tenant.value.move_out,
        lease: Tenant.value.lease,
        user_id: Tenant.value.user_id,
        // customer_id: tState.value.customer_id,
      }),
    };
    fetch(baseURL + "/tenants/update/" + TenantId.value, RequestOptions).then(
      (res) => res.body
    );
    Router.push("/tenants");
    // GetAllTenants();
  };

  // GET BY ID
  const Tenant = ref({});
  const GetSpecificTenant = async () => {
    try {
      fetch(baseURL + "/tenants/get/" + TenantId.value)
        .then((Res) => Res.json())
        .then((Data) => {
          Tenant.value = Data
          // .filter((P) => P._id === TenantId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    User,
    Tenant,
    TenantId,
    GetSpecificTenant,
    tState,
    GetAllTenants,
    GetUsersTenants,
    NewTenant,
    DeleteTenant,
    EditTenant,
  };
};

export default GetTenants;
