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

  const RegisterUser = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id:Route.params.id,
        email: uState.value.email,
        password: uState.value.password,
      }),
    };
    fetch(baseURL + "/users/register", RequestOptions).then((res) => res.body);
    Router.push("/login");
  };

  const LoginUser = async () => {
    try {
      const RequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // id:Route.params.id,
          email: uState.value.email,
          password: uState.value.password,
        }),
      };
      await fetch(baseURL + "/users/login", RequestOptions)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .then((data) => {
          localStorage.setItem("Token", data.data.Token);
          localStorage.setItem("level", data.level);
          localStorage.setItem("userid", data.id);
          // localStorage.setItem("name", response.data.name);
          Router.go("/");
        });
    } catch (error) {
      console.log(error);
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
  const EditUser = async () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id:Route.params.id,
        email: uState.value.email,
        password: uState.value.password,
        userlevel: uState.value.userlevel,
      }),
    };
    await GetSpecificUser();
    await fetch(baseURL + "/users/update/" + UserId.value, RequestOptions)
      .then((res) => res.body)
      .then(() => {
        GetAllUsers();
      });
    Router.push("/register");
  };

  // GET User BY ID
  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      await fetch(baseURL + "/users/")
        .then((Res) => Res.json())
        .then((Data) => {
          User.value = Data.filter((U) => U._id === UserId.value);
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
    RegisterUser,
    LoginUser,
  };
};

export default GetUsers;
