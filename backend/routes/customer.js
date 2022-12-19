const Express = require('express');
const router = Express.Router();
const Customer = require('../models/customer');

// Get all Customers
router.get('/', async (req, res) => {
  const Customers = await Customer.find();
  res.json(Customers);
});

// Create new Customer
router.post('/new', async (req, res) => {
  try {
    const NewCustomer = new Customer(
      req.body // What the Vue App is sending
    );
    const SavedCustomer = await NewCustomer.save(); // mongo save method
    res.json(SavedCustomer); // respond with json to our post endpoint
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Customer by id
router.get('/get/:id', async (req, res) => {
  try {
    const IdCustomer = await Customer.findById({ _id: req.params.id });
    res.json(IdCustomer);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// Get Customers by user id
router.get('/get/byUser/:id', async (req, res) => {
  try {
    const IdCustomer = await Customer.find({ created_by: req.params.id });
    res.json(IdCustomer);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Customer by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const DelCustomer = await Customer.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(DelCustomer);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Customer by id
router.put('/update/:id', async (req, res) => {
  try {
    const UpdCustomer = await Customer.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdCustomer);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;
