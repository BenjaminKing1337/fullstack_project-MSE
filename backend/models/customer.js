const Mongoose = require("mongoose");
const CustomerSchema = new Mongoose.Schema({
  forename: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  surname: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  company_name: {
    type: String,
    required: false,
    min: 2,
    max: 255,
  },
  contact_number: {
    type: String,
    required: false,
    min: 2,
  },
  user_id: {
    // FK
    type: String,
    required: true,
    default: "None",
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
module.exports = Mongoose.model("Customer", CustomerSchema);
