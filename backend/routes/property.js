const Express = require("express");
const router = Express.Router();
const Property = require("../models/property");
const { VerifyToken } = require("../validation");

// Get all Property routes
router.get("/", VerifyToken, async (req, res) => {
  const Properties = await Property.find();
  res.json(Properties);
});

// Create new Property route
router.post("/new", VerifyToken, async (req, res) => {
  try {
    const NewProperty = new Property(
      req.body // What the Vue App is sending
    );
    const SavedProperty = await NewProperty.save(); // mongo save method
    res.json(SavedProperty); // respond with json to our post endpoint
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Properties by id route
router.get("/get/:id", VerifyToken, async (req, res) => {
  try {
    const IdProperty = await Property.findById({ _id: req.params.id });
    res.json(IdProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// Get Properties by user id route
router.get("/get/byUser/:id", VerifyToken, async (req, res) => {
  try {
    const IdProperty = await Property.find({ created_by: req.params.id });
    res.json(IdProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Property by id route
router.delete("/delete/:id", VerifyToken, async (req, res) => {
  try {
    const DelProperty = await Property.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(DelProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Property by id route
router.put("/update/:id", VerifyToken, async (req, res) => {
  try {
    const UpdProperty = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
