const router = require("express").Router();
const User = require("../models/user");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const {
  RegisterValidation,
  LoginValidation,
  VerifyToken,
} = require("../validation");

// Read all users - GET
router.get("/", VerifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Get user by ID - GET
router.get("/get/:id", VerifyToken, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Get Users by user id route
router.get("/get/byUser/:id", VerifyToken, async (req, res) => {
  try {
    const IdUser = await User.find({ created_by: req.params.id });
    res.json(IdUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ROUTE - /registration
router.post("/register", VerifyToken, async (req, res) => {
  // input validation
  const { error } = RegisterValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Does email exist?
  const EmailExist = await User.findOne({ email: req.body.email });
  if (EmailExist) {
    return res.status(400).json({ error: "Email already exists" });
  }
  // password hashing
  const Salt = await Bcrypt.genSalt(10);
  const Pwd = await Bcrypt.hash(req.body.password, Salt);
  // save data as user in db
  const UserObject = new User({
    email: req.body.email,
    created_by: req.body.created_by,
    password: Pwd,
  });
  try {
    const SavedUser = await UserObject.save();
    res.json({ error: null, data: SavedUser._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ROUTE - /login
router.post("/login", async (req, res) => {
  // login info validation
  const { error } = LoginValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // if valid, find in db
  const user = await User.findOne({ email: req.body.email });
  // if not found
  if (!user) {
    return res.status(400).json({ error: "Email is wrong" });
  }
  // if found - check password
  const ValidPass = await Bcrypt.compare(req.body.password, user.password);
  if (!ValidPass) {
    return res.status(400).json({ error: "Password is wrong" });
  }
  // token creation
  const Token = Jwt.sign(
    {
      email: user.email,
      userlevel: user.userlevel,
      id: user._id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  // attach auth token to header
  res.header("auth-token", Token).json({
    error: null,
    data: { Token },
    email: user.email,
    level: user.userlevel,
    id: user._id,
  });
});

// Delete by id route
router.delete("/delete/:id", VerifyToken, async (req, res) => {
  try {
    const DelUser = await User.findByIdAndDelete({ _id: req.params.id });
    res.json(DelUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update by id route
router.put("/update/:id", VerifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      // password hashing
      const Salt = await Bcrypt.genSalt(10);
      const Pwd = await Bcrypt.hash(req.body.password, Salt);
      req.body.password = Pwd;
    }
    const UpdUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body
      // { Pwd: req.body.password }
    );
    console.log(req.body);
    res.json(UpdUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// modular exportation
module.exports = router;
