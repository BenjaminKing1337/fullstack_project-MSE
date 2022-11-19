// var config = require("../dbconfig");
// const sql = require("mssql");
let knex = require("../dbknex");

const router = require("express").Router();
const User = require("../classes/user");
// const Bcrypt = require("bcrypt");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const GetAllUsers = () => {
      knex
        .select("*")
        .from("tblUser")
        .then(function (users) {
          return res.status(200).json(users);
        });
    };
    GetAllUsers();
  } catch (error) {
    console.log(error);
  }
});

// GetById
router.get("/get/:id", async (req, res) => {
  try {
    const UserById = () => {
      knex
        .select("*")
        .from("tblUser")
        .where("id", req.params.id)
        .then(function (user) {
          return res.status(200).json(user);
        });
    };
    UserById();
  } catch (error) {
    res.status(400).json({ error });
  }
});

// CREATE NEW
router.post("/register", async (req, res) => {
  try {
    const NewUser = (email, password, userlevel) => {
      knex("tblUser")
        .insert({
          email: req.body.email,
          password: req.body.password,
          userlevel: req.body.userlevel,
        })
        .returning("id")
        .then((id) => {
          // console.log(id);
          console.log(`New user created with ` + JSON.stringify(id));
        });
    };
    NewUser();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const LoginUser = () => {
      const Authenticate = (email, password) => {
        return knex
          .select("*")
          .from("tblUser")
          .where("email", email)
          .andWhere("password", password)
          .then((tblUser) => {
            if (tblUser.length > 0) {
              console.log(tblUser);
              return /* Promise.resolve( */tblUser/* ) */;
            } else {
              return Promise.resolve(false);
            }
          });
      };
      const result = Authenticate(req.body.email, req.body.password);
      return result.then((user) => {
        if (!user) {
          console.log("Sorry, user doesn't exist");
        } else {
          console.log("User Exists");
        }
      });
    }
    LoginUser();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

// DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    const DeleteUser = (id) => {
      knex("tblUser")
        .where("id", req.params.id)
        .del()
        .then((countRows) => {
          console.log(`${countRows} number of users have been deleted`);
        });
    };
    DeleteUser();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

// UPDATE USER
router.put("/update/:id", async (req, res) => {
  try {
    const UpdateUser = (email, password, userlevel) => {
      knex("tblUser")
        .where("id", req.params.id)
        .update({
          email: req.body.email,
          password: req.body.password,
          userlevel: req.body.userlevel,
        })
        .then((countRows) => {
          console.log(`${countRows} have been updated`);
        });
    };
    UpdateUser();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

// // GetALL
// router.get("/", async (req, res) => {
//     try {
//       let pool = await sql.connect(config);
//       const Users = await pool.request().query("select * from tblUser");
//       res.json(Users.recordsets[0]);
//       sql.close();
//     } catch (error) {
//       res.status(400).json({ error });
//       sql.close();
//     }
//   });

// router.post("/register", async (req, res) => {
// try {
//     const NewUser = new User(
//         undefined,
//         req.body.email,
//         req.body.password,
//         req.body.userlevel
//     );
//     // const {email, password, passcheck} = req.body;
//     // const hash = await Bcrypt.hash(password, 10);
//     let pool = await sql.connect(config);
//     const SavedUser = await pool
//     .request()
//     .input("email", sql.NVarChar, NewUser.email)
//     .input("password", sql.NVarChar, NewUser.password)
//     .input("userlevel", sql.NVarChar, NewUser.userlevel)
//     .query("insert into tblUser(email, password, userlevel) values (@email, @password, @userlevel)"
//     );
//     res.status(200);
//     sql.close();
// } catch (error) {
//     res.status(400).json({ error });
//     sql.close();
// }
// });

module.exports = router;
