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
  // POST Register User
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
  const RegisterUserByAdmin = () => {
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
    fetch(baseURL + "/users/register", RequestOptions)
      .then((res) => res.body)
      .then(() => {
        GetAllUsers(); // Updates page
      });
  };
  //  POST Login User
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
          localStorage.setItem("email", data.email);
          // localStorage.setItem("name", response.data.name);
          Router.push({path: '/'});
          window.location.reload(true);
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
        email: User.value.email,
        // password: User.value.password,
        userlevel: User.value.userlevel,
      }),
    };
    // await GetSpecificUser();
    await fetch(baseURL + "/users/update/" + UserId.value, RequestOptions)
      .then((res) => res.body)
      .then(() => {
        GetAllUsers();
      });
    Router.push("/register");
  };
  // UPDATE User BY ID
  const confirmPwd = ref("");
  const EditPwd = async () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // id:Route.params.id,
        password: uState.value.password,
      }),
    };
    if (uState.value.password === confirmPwd.value) {
      await fetch(baseURL + "/users/update/" + UserId.value, RequestOptions)
        .then((res) => res.body)
        .then(() => {
          GetAllUsers();
        });
      Router.push("/users/" + UserId.value);
    } else {
      console.log("wrong password");
    }
  };

  // GET User BY ID
  const User = ref({});
  const GetSpecificUser = async () => {
    try {
      await fetch(baseURL + "/users/get/" + UserId.value)
        .then((Res) => Res.json())
        .then((Data) => {
          User.value = Data;
          // .filter((U) => U._id === UserId.value);
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
    confirmPwd,
    EditPwd,
    RegisterUser,
    RegisterUserByAdmin,
    LoginUser,
  };
};

export default GetUsers;
