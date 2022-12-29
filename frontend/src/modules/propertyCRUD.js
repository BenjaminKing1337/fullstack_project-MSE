import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";
import Notify from "../modules/utils.js";

const GetProperties = () => {
  const Route = useRoute();
  const Router = useRouter();
  const PropertyId = computed(() => Route.params.id);
  const { NotifyError } = Notify();

  const pState = ref({
    name: "",
    floor: "",
    number: "",
    address: "",
    postal_code: "",
    value: "",
    bank_note: "",
    created_by: localStorage.getItem("userid"),
    building_id: "Assign Building",
    renter_id: "Assign Renter",
    owner_id: "Assign Owner",
    Properties: {},
  });

  // GET ALL PROPERTIES
  const GetAllProperties = async () => {
    try {
      await fetch(baseURL + "/properties", {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          pState.value.Properties = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const GetUsersProperties = async () => {
    try {
      await fetch(
        baseURL + "/properties/get/byUser/" + localStorage.getItem("userid"),
        {
          headers: {
            "auth-token": localStorage.getItem("Token"),
          },
        }
      )
        .then((Res) => Res.json())
        .then((Data) => {
          pState.value.Properties = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  // CREATE NEW PROPERTY
  const NewProperty = () => {
    try {
      const RequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          name: pState.value.name,
          floor: pState.value.floor,
          number: pState.value.number,
          address: pState.value.address,
          postal_code: pState.value.postal_code,
          value: pState.value.value,
          bank_note: pState.value.bank_note,
          created_by: pState.value.created_by,
          building_id:
            pState.value.building_id == "Assign Building"
              ? "None"
              : pState.value.building_id,
          renter_id:
            pState.value.renter_id == "Assign Renter"
              ? "None"
              : pState.value.renter_id,
          owner_id:
            pState.value.owner_id == "Assign Owner"
              ? "None"
              : pState.value.owner_id,
        }),
      };
      // GetUsersProperties(); // updates page
      fetch(baseURL + "/properties/new", RequestOptions)
        // GetAllProperties()
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => {
          if (data.error) {
            NotifyError(data.error._message ? data.error._message : data.error);
          } else {
            GetUsersProperties(); // updates page
            Router.push("/properties");
          }
        });
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
  };

  // DELETE PROPERTY BY ID
  const DeleteProperty = (_id) => {
    var choice = confirm("Are you sure you want to delete this Property?");
    if (choice) {
      fetch(baseURL + "/properties/delete/" + _id, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      }).then(() => {
        GetUsersProperties(); // Updates page
      });
    } else {
      Router.push("/properties");
    }
  };

  // UPDATE PROPERTY BY ID
  const EditProperty = () => {
    try {
      const RequestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("Token"),
        },
        body: JSON.stringify({
          // id:Route.params.id,
          name: Property.value.name,
          floor: Property.value.floor,
          number: Property.value.number,
          address: Property.value.address,
          postal_code: Property.value.postal_code,
          value: Property.value.value,
          bank_note: Property.value.bank_note,
          created_by: Property.value.created_by,
          building_id: Property.value.building_id,
          renter_id: Property.value.renter_id,
          owner_id: Property.value.owner_id,
        }),
      };
      fetch(baseURL + "/properties/update/" + PropertyId.value, RequestOptions)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => {
          if (data.error) {
            NotifyError(data.error._message ? data.error._message : data.error);
          } else {
            GetUsersProperties(); // updates page
            Router.push("/properties");
          }
        });
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
  };

  // GET PROPERTY BY ID
  const Property = ref({});
  const GetSpecificProperty = async () => {
    try {
      fetch(baseURL + "/properties/get/" + PropertyId.value, {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          Property.value = Data;
          // .filter((P) => P._id === PropertyId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // GET PROPERTY BY LOGGED IN USER'S TENANT ID
  // const LoggedInTenantsProperty = ref({});
  // const GetLoggedInTenantsProperty = async () => {
  //   try {
  //     fetch(baseURL + '/properties')
  //       .then((Res) => Res.json())
  //       .then((Data) => {
  //         LoggedInTenantsProperty.value = Data.filter((P) => P._id === PropertyId.value);
  //       });
  //   } catch (Error) {
  //     console.log(Error);
  //   }
  // };

  return {
    Property,
    PropertyId,
    GetSpecificProperty,
    pState,
    GetAllProperties,
    GetUsersProperties,
    NewProperty,
    DeleteProperty,
    EditProperty,
  };
};

export default GetProperties;
