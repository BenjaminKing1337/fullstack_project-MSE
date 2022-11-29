const Express = require("express");
const router = Express.Router();
const Property = require("../models/property");

// Get all Property routes
router.get("/", async (req, res) => {
  const Properties = await Property.find();
  res.json(Properties);
});

// Create new Property route
router.post("/new", async (req, res) => {
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
router.get("/get/:id", async (req, res) => {
  try {
    const IdProperty = await Property.findById({ _id: req.params.id });
    res.json(IdProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Property by id route
router.delete("/delete/:id", async (req, res) => {
  try {
    const DelProperty = await Property.findByIdAndDelete({ _id: req.params.id });
    res.json(DelProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Property by id route
router.put("/update/:id", async (req, res) => {
  try {
    const UpdProperty = await Property.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdProperty);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
