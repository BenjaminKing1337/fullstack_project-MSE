const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userlevel: {
    type: String,
    required: true,
    enum: ['superadmin', 'admin', 'user'], // Only accepts these 3 types
    default: 'user',
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = Mongoose.model('User', UserSchema);
