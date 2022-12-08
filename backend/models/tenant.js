const Mongoose = require('mongoose');
const TenantSchema = new Mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Owner', 'Renter'], // Only accepts these 2 types
  },
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
    required: false,
    min: 2,
    max: 255,
  },
  phone_number: {
    type: Number,
    required: false,
    min: 8,
  },
  keys_number: {
    type: String,
    required: true,
    min: 1,
    max: 10,
  },
  closest_neighbour: {
    type: String,
    required: false,
    min: 2,
    max: 100,
  },
  account_number: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  move_in: {
    type: Date,
    required: true,
  },
  move_out: {
    type: Date,
    required: true,
  },
  lease: {
    type: String,
    // type: Buffer,
    required: false,
  },
  user_id: {
    // FK
    type: String,
    required: true,
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
module.exports = Mongoose.model('Tenant', TenantSchema);
