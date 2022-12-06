const Express = require("express");
const router = Express.Router();
const Tenant = require("../models/tenant");

// Get all Tenant routes
router.get("/", async (req, res) => {
  const Tenants = await Tenant.find();
  res.json(Tenants);
});

// Create new Tenant route
router.post("/new", async (req, res) => {
  try {
    const NewTenant = new Tenant(
      req.body // What the Vue App is sending
    );
    const SavedTenant = await NewTenant.save(); // mongo save method
    res.json(SavedTenant); // respond with json to our post endpoint
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Tenants by id route
router.get("/get/:id", async (req, res) => {
  try {
    const IdTenant = await Tenant.findById({ _id: req.params.id });
    res.json(IdTenant);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// Get Tenants by user id route
router.get("/get/byUser/:id", async (req, res) => {
  try {
    const IdTenant = await Tenant.find({ user_id: req.params.id });
    res.json(IdTenant);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Tenant by id route
router.delete("/delete/:id", async (req, res) => {
  try {
    const DelTenant = await Tenant.findByIdAndDelete({ _id: req.params.id });
    res.json(DelTenant);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Tenant by id route
router.put("/update/:id", async (req, res) => {
  try {
    const UpdTenant = await Tenant.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdTenant);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
