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


  // CREATE NEW User
  const NewUser = () => {
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: uState.value.email,
        password: uState.value.password,
        userlevel: "user"
      })
    }; 
    fetch(baseURL + "/users/register", RequestOptions
    )
    GetAllUsers()
    .then(() => { 
       GetAllUsers(); // Updates page
      })
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
        number: User.value.number,
        address: User.value.address,
        name: User.value.name,
      }),
    };
    fetch(
      baseURL + "/users/update/" + UserId.value,
      RequestOptions
    ).then((res) => res.body);
    Router.push("/users");
    GetAllUsers();
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
    NewUser,
    DeleteUser,
    EditUser,
  };
};

export default GetUsers;
