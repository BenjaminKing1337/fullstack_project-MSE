import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";

const GetBuildings = () => {
  const Route = useRoute();
  const Router = useRouter();
  const BuildingId = computed(() => Route.params.id);

  const bState = ref({
    name: "",
    number: "",
    postal_code: "",
    created_by: localStorage.getItem("userid"),
    Buildings: {},
  });

  // GET ALL BUILDINGS
  const GetAllBuildings = async () => {
    try {
      await fetch(baseURL + "/buildings", {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          bState.value.Buildings = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  // GET BUILDINGS CREATED BY THE LOGGED IN USER
  const GetUsersBuildings = async () => {
    try {
      await fetch(
        baseURL + "/buildings/get/byUser/" + localStorage.getItem("userid"),
        {
          headers: {
            "auth-token": localStorage.getItem("Token"),
          },
        }
      )
        .then((Res) => Res.json())
        .then((Data) => {
          bState.value.Buildings = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // CREATE NEW BUILDING
  const NewBuilding = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Token"),
      },
      body: JSON.stringify({
        name: bState.value.name,
        number: bState.value.number,
        postal_code: bState.value.postal_code,
        created_by: bState.value.created_by,
      }),
    };
    fetch(baseURL + "/buildings/new", RequestOptions).then(() => {
      GetUsersBuildings(); // Updates page
    });
  };

  // DELETE BUILDING BY ID
  const DeleteBuilding = (_id) => {
    fetch(baseURL + "/buildings/delete/" + _id, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("Token"),
      },
    }).then(() => {
      GetUsersBuildings(); // Updates page
    });
  };

  // UPDATE BUILDING BY ID
  const EditBuilding = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Token"),
      },
      body: JSON.stringify({
        // id:Route.params.id,
        name: Building.value.name,
        number: Building.value.number,
        postal_code: Building.value.postal_code,
        created_by: Building.value.created_by,
      }),
    };
    fetch(
      baseURL + "/buildings/update/" + BuildingId.value,
      RequestOptions
    ).then((res) => res.body);
    Router.push("/buildings");
  };

  // GET BUILDING BY ID
  const Building = ref({});
  const GetSpecificBuilding = async () => {
    try {
      fetch(baseURL + "/buildings/get/" + BuildingId.value, {
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      })
        .then((Res) => Res.json())
        .then((Data) => {
          Building.value = Data;
          // .filter((P) => P._id === PropertyId.value);
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    Building,
    BuildingId,
    GetSpecificBuilding,
    bState,
    GetAllBuildings,
    GetUsersBuildings,
    NewBuilding,
    DeleteBuilding,
    EditBuilding,
  };
};
export default GetBuildings;
