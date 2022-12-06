import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";

const GetProperties = () => {
  const Route = useRoute();
  const Router = useRouter();
  const PropertyId = computed(() => Route.params.id);

  const pState = ref({
    name: "",
    floor: "",
    number: "",
    address: "",
    postal_code: "",
    value: "",
    bank_note: "",
    customer_id: localStorage.getItem('userid'),
    building_id: "",
    renter_id: "",
    owner_id: "",
    Properties: {},
  });

  // GET ALL PROPERTIES
  const GetAllProperties = async () => {
    try {
      await fetch(baseURL + "/properties")
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
      await fetch(baseURL + "/properties/get/byUser/" + localStorage.getItem('userid'))
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
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // UserId: localStorage.getItem('userid'),
        // id: "",
        name: pState.value.name,
        floor: pState.value.floor,
        number: pState.value.number,
        address: pState.value.address,
        postal_code: pState.value.postal_code,
        value: pState.value.value,
        bank_note: pState.value.bank_note,
        customer_id: pState.value.customer_id,
        building_id: pState.value.building_id,
        renter_id: pState.value.renter_id,
        owner_id: pState.value.owner_id,
      }),
    };
    fetch(baseURL + "/properties/new", RequestOptions)
      // GetAllProperties()
      .then(() => {
        GetAllProperties(); // Updates page
      });
  };

  // DELETE PROPERTY BY ID
  const DeleteProperty = (_id) => {
    fetch(baseURL + "/properties/delete/" + _id, {
      method: "DELETE",
    }).then(() => {
      GetAllProperties(); // Updates page
    });
  };

  // UPDATE PROPERTY BY ID
  const EditProperty = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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
        customer_id: Property.value.customer_id,
        building_id: Property.value.building_id,
        renter_id: Property.value.renter_id,
        owner_id: Property.value.owner_id,
      }),
    };
    fetch(
      baseURL + "/properties/update/" + PropertyId.value,
      RequestOptions
    ).then((res) => res.body);
    Router.push("/properties");
    // GetAllProperties();
  };

  // GET PROPERTY BY ID
  const Property = ref({});
  const GetSpecificProperty = async () => {
    try {
      fetch(baseURL + "/properties/get/" + PropertyId.value)
        .then((Res) => Res.json())
        .then((Data) => {
          Property.value = Data;
          // .filter((P) => P._id === PropertyId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

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
