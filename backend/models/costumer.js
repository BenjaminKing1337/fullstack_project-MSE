const Mongoose = require('mongoose');
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
    min: 2,
    max: 255,
  },
  company_name: {
    type: String,
    required: false,
    min: 2,
    max: 255,
  },
  contact_number: {
    type: Number,
    required: false,
    min: 8,
  },
  user_id: {
    // FK
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = Mongoose.model('Customer', CustomerSchema);
