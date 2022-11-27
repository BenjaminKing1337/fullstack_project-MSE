
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
let UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255
        },
        date: {
            type: Date,
            default: Date.now
        },
        userlevel: {
            type: String,
            default: 'user'
        },
    }
);

module.exports = Mongoose.model("User", UserSchema);

