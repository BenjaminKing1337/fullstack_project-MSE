import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";
import Notify from "../modules/utils.js";

const GetTenants = () => {
  const Route = useRoute();
  const Router = useRouter();
  const TenantId = computed(() => Route.params.id);
  const { NotifyError } = Notify();

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
    user_id: "None",
    created_by: localStorage.getItem("userid"),
    Tenants: {},
  });

  // GET ALL
  const GetAllTenants = async () => {
    try {
      await fetch(baseURL + "/tenants", {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
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
      await fetch(
        baseURL + "/tenants/get/byUser/" + localStorage.getItem("userid"),
        {
          headers: {
            "auth-token": localStorage.getItem("Token"),
          },
        }
      )
        .then((Res) => Res.json())
        .then((Data) => {
          tState.value.Tenants = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  const DatesAreOK = (requestType) => {
    let moveInDate =
      requestType === "new"
        ? tState.value.move_in
        : Tenant.value.move_in_formatted;
    moveInDate = new Date(moveInDate);
    moveInDate = moveInDate.toISOString();

    let moveOutDate =
      requestType === "new"
        ? tState.value.move_out
        : Tenant.value.move_out_formatted;
    moveOutDate = new Date(moveOutDate);
    moveOutDate = moveOutDate.toISOString();

    let areDatesOk = false;
    let nowDate = new Date();
    nowDate = nowDate.toISOString();

    if (moveInDate < nowDate && requestType === "new") {
      NotifyError("Move In date must start from tomorrow");
    } else if (moveOutDate < nowDate && requestType === "new") {
      NotifyError("Move Out date must start from tomorrow");
    } else if (moveInDate === moveOutDate) {
      NotifyError("Move In Date must be different than Move Out Date");
    } else if (moveInDate > moveOutDate) {
      NotifyError("Move In Date cannot be greater than Move Out Date");
    } else {
      areDatesOk = true;
    }
    return areDatesOk;
  };
  // CREATE NEW
  const NewTenant = () => {
    try {
      // after formatting for quasar forms
      // we need to format again some fields
      // Conversion of dates to ISO 8601 before being stored in the database
      tState.value.keys_number = tState.value.keys_number.toString();

      if (DatesAreOK("new")) {
        tState.value.move_in = new Date(tState.value.move_in);
        tState.value.move_in = tState.value.move_in.toISOString();
        tState.value.move_out = new Date(tState.value.move_out);
        tState.value.move_out = tState.value.move_out.toISOString();
        const RequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Token"),
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
            created_by: tState.value.created_by,
          }),
        };
        fetch(baseURL + "/tenants/new", RequestOptions)
          // GetAllTenants()
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .then((data) => {
            if (data.error) {
              NotifyError(data.error);
            } else {
              GetUsersTenants(); // Updates page
              Router.push("/tenants");
            }
          });
      }
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
  };

  // DELETE BY ID
  const DeleteTenant = (_id) => {
    var choice = confirm("Are you sure you want to delete this Tenant?");
    if (choice) {
      fetch(baseURL + "/tenants/delete/" + _id, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      }).then(() => {
        GetUsersTenants(); // Updates page
      });
    } else {
      Router.push("/tenants");
    }
  };

  // UPDATE BY ID
  const EditTenant = () => {
    try {
      Tenant.value.keys_number = Tenant.value.keys_number.toString();
      if (DatesAreOK("edit")) {
        Tenant.value.move_in_formatted = new Date(
          Tenant.value.move_in_formatted
        );
        Tenant.value.move_in_formatted =
          Tenant.value.move_in_formatted.toISOString();
        Tenant.value.move_out_formatted = new Date(
          Tenant.value.move_out_formatted
        );
        Tenant.value.move_out_formatted =
          Tenant.value.move_out_formatted.toISOString();
        const RequestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("Token"),
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
            move_in: Tenant.value.move_in_formatted,
            move_out: Tenant.value.move_out_formatted,
            lease: Tenant.value.lease,
            user_id: Tenant.value.user_id,
            // created_by: tState.value.created_by,
          }),
        };
        fetch(baseURL + "/tenants/update/" + TenantId.value, RequestOptions)
          // GetAllTenants();
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .then((data) => {
            if (data.error) {
              NotifyError(data.error);
            } else {
              Router.push("/tenants");
            }
          });
      }
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
  };

  // GET BY ID
  const Tenant = ref({});
  const GetSpecificTenant = async () => {
    try {
      fetch(baseURL + "/tenants/get/" + TenantId.value, {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          Tenant.value = Data;
          Tenant.value.move_in_formatted = Data.move_in.slice(0, 10);
          Tenant.value.move_out_formatted = Data.move_out.slice(0, 10);
          // .filter((P) => P._id === TenantId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // GET BY ID OF LOGGEDI IN USER
  const LoggedInTenant = ref({});
  const GetLoggedInTenant = async () => {
    try {
      await fetch(baseURL + "/tenants", {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          LoggedInTenant.value = Data.filter(
            (T) => T.user_id === localStorage.getItem("userid")
          )[0];
          localStorage.setItem("tenantid", LoggedInTenant.value._id);
          console.log(LoggedInTenant.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    // User,
    Tenant,
    LoggedInTenant,
    TenantId,
    GetSpecificTenant,
    GetLoggedInTenant,
    tState,
    GetAllTenants,
    GetUsersTenants,
    NewTenant,
    DeleteTenant,
    EditTenant,
    DatesAreOK,
  };
};

export default GetTenants;
