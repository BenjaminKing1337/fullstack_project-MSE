const Mongoose = require('mongoose');
const BuildingSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  number: {
    type: String,
    required: true,
    min: 1,
    max: 30,
  },
  postal_code: {
    type: String,
    required: true,
    min: 2,
    max: 10,
  },
  created_by: {
    // FK
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = Mongoose.model('Building', BuildingSchema);
