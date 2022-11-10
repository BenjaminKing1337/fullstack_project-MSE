import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";

const GetProperties = () => {
  const Route = useRoute();
  const Router = useRouter();
  const PropertyId = computed(() => Route.params.id);

  const pState = ref({
    number: "",
    address: "",
    name: "",
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

  // const GetSpecificProperty = async () => {
  //   try {
  //     fetch(baseURL + "/api/properties")
  //       .then((Res) => Res.json())
  //       .then((Data) => {
  //         // Property.value = Data.result;
  //         let DataFiltered = Data.result.filter((L) => L.id == PropertyId.value);
  //         Property.value = DataFiltered;
  //         // Property.value = Data.result.filter((L) => L.id === PropertyId.value);
  //         console.log(DataFiltered)
  //       });
  //   } catch (Error) {
  //     console.log(Error);
  //   }
  // };

  // CREATE NEW PROPERTY
  const NewProperty = async () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // UserId: localStorage.getItem('userid'),
        // id: "",
        number: pState.value.number,
        address: pState.value.address,
        name: pState.value.name,
      })
    }; 
    fetch(baseURL + "/properties/new", RequestOptions
    )
    await GetAllProperties()
    .then(async() => {
       await GetAllProperties(); // Updates page
      })
  };

  // DELETE PROPERTY BY ID
  const DeleteProperty = (PropertyId) => {
    fetch(baseURL + "/properties/delete/" + PropertyId, {
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
        number: pState.value.number,
        address: pState.value.address,
        name: pState.value.name,
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
    NewProperty,
    DeleteProperty,
    EditProperty,
  };
};

export default GetProperties;
