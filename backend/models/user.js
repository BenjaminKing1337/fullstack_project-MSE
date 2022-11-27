const Mongoose = require('mongoose');
const UserSchema = new Mongoose.Schema({
  // the id is automatically generated (_id)
  user_level: {
    type: String,
    required: true,
    enum: ['superadmin', 'admin', 'user'], // Only accepts these 3 types
  },
  username: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 30,
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = Mongoose.model('User', UserSchema);
