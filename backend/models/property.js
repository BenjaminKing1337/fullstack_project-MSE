const Mongoose = require("mongoose");
const PropertySchema = new Mongoose.Schema({
  number: { type: String, required: true },
  address: { type: String, required: true },
  name: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Mongoose.model("Property", PropertySchema);
