import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import baseURL from "./baseURL";
import Notify from "../modules/utils.js";
import TenantCRUD from "./tenantCRUD";

const GetUsers = () => {
  const Route = useRoute();
  const Router = useRouter();
  const UserId = computed(() => Route.params.id);
  const { NotifyError } = Notify();
  const { LoggedInTenant, GetLoggedInTenant } = TenantCRUD();

  const uState = ref({
    email: "",
    password: "",
    userlevel: "",
    Users: {},
    response: "",
    created_by: localStorage.getItem("userid"),
  });

  // GET ALL Users
  const GetAllUsers = async () => {
    const RequestOptions = {
      headers: {
        "auth-token": localStorage.getItem("Token"),
      },
    };
    try {
      await fetch(baseURL + "/users", RequestOptions)
        .then((Res) => Res.json())
        .then((Data) => {
          uState.value.Users = Data;
        });
    } catch (Error) {
      console.log(Error);
    }
  };
  // GET User's users
  const GetUsersUsers = async () => {
    try {
      await fetch(
        baseURL + "/users/get/byUser/" + localStorage.getItem("userid"),
        {
          headers: {
            "auth-token": localStorage.getItem("Token"),
          },
        }
      )
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
        "auth-token": localStorage.getItem("Token"),
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
        "auth-token": localStorage.getItem("Token"),
      },
      body: JSON.stringify({
        // id:Route.params.id,
        email: uState.value.email,
        password: uState.value.password,
        created_by: uState.value.created_by,
      }),
    };
    fetch(baseURL + "/users/register", RequestOptions)
      .then((res) => res.body)
      .then(() => {
        Router.push("/users");
        GetUsersUsers(); // Updates page
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
          if (data.error) {
            uState.value.response = data.error;
            NotifyError(uState.value.response);
          } else {
            localStorage.setItem("Token", data.data.Token);
            localStorage.setItem("level", data.level);
            localStorage.setItem("userid", data.id);
            localStorage.setItem("email", data.email);
            GetLoggedInTenant().then(
              localStorage.setItem("tenantid", LoggedInTenant.value._id)
            );
            // localStorage.setItem("name", response.data.name);
            Router.push("/");
            window.location.reload(true);
          }
        });
    } catch (error) {
      NotifyError(error);
    }
  };
  // DELETE User BY ID
  const DeleteUser = (UserId) => {
    var choice = confirm("Are you sure you want to delete this User?")
    if (choice) {
      fetch(baseURL + "/users/delete/" + UserId, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("Token"),
        },
      }).then(() => {
        GetAllUsers(); // Updates page
      })
    } else {
      Router.push("/users")
    }
  };
  // UPDATE User BY ID
  const EditUser = async () => {
    const RequestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("Token"),
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
    Router.push("/users");
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
    const RequestOptions = {
      headers: {
        "auth-token": localStorage.getItem("Token"),
      },
    };
    try {
      await fetch(baseURL + "/users/get/" + UserId.value, RequestOptions)
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
    LoggedInTenant,
    User,
    UserId,
    GetSpecificUser,
    uState,
    GetAllUsers,
    GetUsersUsers,
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
