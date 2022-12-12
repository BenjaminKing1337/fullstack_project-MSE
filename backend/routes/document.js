const Express = require('express');
const router = Express.Router();
const Document = require('../models/document');

// Get all Documents
router.get('/', async (req, res) => {
  const Documents = await Document.find();
  res.json(Documents);
});

// Create new Document
router.post('/new', async (req, res) => {
  try {
    const NewDocument = new Document(
      req.body // What the Vue App is sending
    );
    const SavedDocument = await NewDocument.save(); // mongo save method
    res.json(SavedDocument); // respond with json to our post endpoint
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get Document by id
router.get('/get/:id', async (req, res) => {
  try {
    const IdDocument = await Document.findById({ _id: req.params.id });
    res.json(IdDocument);
  } catch (error) {
    res.status(400).json({ error });
  }
});
// Get Documents by user id
router.get('/get/byUser/:id', async (req, res) => {
  try {
    const IdDocument = await Document.find({ created_by: req.params.id });
    res.json(IdDocument);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Document by id
router.delete('/delete/:id', async (req, res) => {
  try {
    const DelDocument = await Document.findByIdAndDelete({
      _id: req.params.id,
    });
    res.json(DelDocument);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update Document by id
router.put('/update/:id', async (req, res) => {
  try {
    const UpdDocument = await Document.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(UpdDocument);
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = router;