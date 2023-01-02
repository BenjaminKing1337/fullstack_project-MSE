const Express = require("express");
const router = Express.Router();
const Building = require("../models/building");
const { VerifyToken } = require("../validation");

// Get all Buildings
router.get("/", VerifyToken, async (req, res) => {
  const Buildings = await Building.find();
  res.json(Buildings);
});

// Create new Building
router.post("/new", VerifyToken, async (req, res) => {
  try {
    const NewBuilding = new Building(
      req.body // What the Vue App is sending
    );
    const SavedBuilding = await NewBuilding.save(); // mongo save method
    res.json(SavedBuilding); // respond with json to our post endpoint
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Building by id
router.get("/get/:id", VerifyToken, async (req, res) => {
  try {
    const IdBuilding = await Building.findById({ _id: req.params.id });
    res.json(IdBuilding);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Buildings by user id
router.get("/get/byUser/:id", VerifyToken, async (req, res) => {
  try {
    const IdBuilding = await Building.find({ created_by: req.params.id });
    res.json(IdBuilding);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Building by id
router.delete("/delete/:id", VerifyToken, async (req, res) => {
  try {
    const DelBuilding = await Building.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(DelBuilding);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Building by id
router.put("/update/:id", VerifyToken, async (req, res) => {
  try {
    const UpdBuilding = await Building.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdBuilding);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
