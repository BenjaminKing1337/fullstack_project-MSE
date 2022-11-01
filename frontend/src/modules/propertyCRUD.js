import { ref, computed } from "vue";
import { useRoute /* useRouter */ } from "vue-router";
import baseURL from "./baseURL";

const GetProperties = () => {
  const Route = useRoute();
  // const Router = useRouter();
  const PropertyId = computed(() => Route.params.id);

  const pState = ref({
    number: "",
    address: "",
    name: "",
    Properties: {},
  });

  const GetAllProperties = async () => {
    try {
      await fetch(baseURL + "/api/properties")
        .then((Res) => Res.json())
        .then((Data) => {
          pState.value.Properties = Data.result;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  const Property = ref({});
  const GetSpecificProperty = async () => {
    try {
      fetch(baseURL + "/api/property/")
        .then((Res) => Res.json())
        .then((Data) => {
          Property.value = Data.filter((L) => L._id === PropertyId.value);
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
  };
};

export default GetProperties;
