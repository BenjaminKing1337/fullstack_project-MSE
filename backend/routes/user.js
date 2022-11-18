var config = require("../dbconfig");
const sql = require("mssql");

const router = require("express").Router();
const User = require("../classes/user");
// const Bcrypt = require("bcrypt");


// GetALL
router.get("/", async (req, res) => {
    try {
      let pool = await sql.connect(config);
      const Users = await pool.request().query("select * from tblUser");
      res.json(Users.recordsets[0]);
      sql.close();
    } catch (error) {
      res.status(400).json({ error });
      sql.close();
    }
  });

router.post("/register", async (req, res) => {
try {
    const NewUser = new User(
        undefined,
        req.body.email,
        req.body.password,
        req.body.userlevel
    );
    // const {email, password, passcheck} = req.body;
    // const hash = await Bcrypt.hash(password, 10);
    let pool = await sql.connect(config);
    const SavedUser = await pool
    .request()
    .input("email", sql.NVarChar, NewUser.email)
    .input("password", sql.NVarChar, NewUser.password)
    .input("userlevel", sql.NVarChar, NewUser.userlevel)
    .query("insert into tblUser(email, password, userlevel) values (@email, @password, @userlevel)"
    );
    res.status(200);
    sql.close();
} catch (error) {
    res.status(400).json({ error });
    sql.close();
}
});

// router.post("/login", async (req, res) => { 

// };

module.exports = router;