const Mongoose = require('mongoose');
const DocumentSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  content: {
    type: Buffer,
    required: false,
  },
  type: [
    {
      name: {
        type: String,
        required: true,
        min: 1,
        max: 100,
      },
      is_active: {
        type: Boolean,
        required: true,
      },
    },
  ],
  //we can only have property, building or customer as "not null".
  property_id: {
    // FK
    type: String,
    required: false,
  },
  building_id: {
    // FK
    type: String,
    required: false,
  },
  created_by: {
    // FK
    type: String,
    required: false,
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
module.exports = Mongoose.model('Document', DocumentSchema);
