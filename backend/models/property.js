const Mongoose = require('mongoose');
// Can be an apartment or a house
const PropertySchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  floor: {
    // If floor is null, it's a house
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  number: {
    type: String,
    required: true,
    min: 2,
    max: 20,
  },
  address: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  postal_code: {
    type: String,
    required: true,
    min: 2,
    max: 10,
  },
  value: {
    type: Number,
    required: true,
    min: 2,
    max: 255,
  },
  bank_note: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  created_by: {
    // FK
    type: String,
    required: true,
  },
  building_id: {
    //   // If building_id is null, it's a house
    //   // FK
    type: String,
    required: true,
    default: 'None',
  },
  can_be_rented: {
    // FIXME
    type: Boolean,
    // required: true,
  },
  renter_id: {
    // FK
    type: String,
    required: true,
    default: 'None',
  },
  // If owner and renter id are null, the property is empty.
  // The customer still owns the property. No owner or renter
  owner_id: {
    // FK
    type: String,
    required: true,
    default: 'None',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Mongoose.model('Property', PropertySchema);
