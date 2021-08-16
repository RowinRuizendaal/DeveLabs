const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Datastructure/Schema of the user object
 *
 */

const userSchema = new Schema({
    name: String,
    emailAddress: String,
    password: String,
});

exports.userSchema = userSchema;
module.exports = new mongoose.model("users", userSchema);