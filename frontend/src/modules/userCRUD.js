import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";

const GetUsers = () => {
  const Route = useRoute();
  const Router = useRouter();
  const UserId = computed(() => Route.params.id);

  const uState = ref({
    email: "",
    password: "",
    userlevel: "",
    Users: {},
  });

  // GET ALL Users
  const GetAllUsers = () => {
    try {
      fetch(baseURL + "/users")
        .then((Res) => Res.json())
        .then((Data) => {
          uState.value.Users = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };




  // DELETE User BY ID
  const DeleteUser = (UserId) => {
    fetch(baseURL + "/users/delete/" + UserId, {
      method: "DELETE",
    }).then(() => {
      GetAllUsers(); // Updates page
    });
  };

  // UPDATE User BY ID
  const EditUser = () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id:Route.params.id,
        email: User.value.email,
        password: User.value.password,
      }),
    };
    fetch(
      baseURL + "/users/update/" + UserId.value,
      RequestOptions
    ).then((res) => res.body);
    Router.push("/");
  };

  // GET User BY ID
  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      fetch(baseURL + "/users/get/" + UserId.value)
        .then((Res) => Res.json())
        .then((Data) => {
          User.value = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };

  return {
    User,
    UserId,
    GetSpecificUser,
    uState,
    GetAllUsers,
    DeleteUser,
    EditUser,
  };
};

export default GetUsers;
