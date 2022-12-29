import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";
import Notify from "../modules/utils.js";

const GetBuildings = () => {
  const Route = useRoute();
  const Router = useRouter();
  const BuildingId = computed(() => Route.params.id);
  const { NotifyError } = Notify();

  const bState = ref({
    name: "",
    number: "",
    postal_code: "",
    created_by: localStorage.getItem("userid"),
    Buildings: {},
    BuildingsFormattedQ: [],
  });
  const formatBuildings = (buildingsArr) => {
    let buildingsArrFormatted = [
      { label: "Assign Building", value: "Assign Building" },
    ];
    for (let i = 0; i < buildingsArr.length; i++) {
      buildingsArrFormatted.push({
        label: buildingsArr[i].name + " " + buildingsArr[i].number,
        value: buildingsArr[i]._id,
      });
    }
    return buildingsArrFormatted;
  };
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
          bState.value.BuildingsFormattedQ = formatBuildings(Data);
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
          bState.value.BuildingsFormattedQ = formatBuildings(Data);
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // CREATE NEW BUILDING
  const NewBuilding = () => {
    try {
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
      fetch(baseURL + "/buildings/new", RequestOptions)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => {
          if (data.error) {
            NotifyError(data.error._message ? data.error._message : data.error);
          } else {
            Router.push("/buildings");
          }
        });
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
  };

  // DELETE BUILDING BY ID
  const DeleteBuilding = (_id) => {
    var choice = confirm("Are you sure you want to delete this Building?");
    if (choice) {
      fetch(baseURL + "/buildings/delete/" + _id, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      }).then(() => {
        GetUsersBuildings(); // Updates page
      });
    } else {
      Router.push("/buildings");
    }
  };

  // UPDATE BUILDING BY ID
  const EditBuilding = () => {
    try {
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
      fetch(baseURL + "/buildings/update/" + BuildingId.value, RequestOptions)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => {
          if (data.error) {
            NotifyError(data.error._message ? data.error._message : data.error);
          } else {
            Router.push("/buildings");
          }
        });
    } catch (e) {
      NotifyError("Ooops. Something went wrong.");
    }
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
