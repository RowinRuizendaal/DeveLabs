const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Datastructure/Schema of the user object
 *
 */

const blogSchema = new Schema({
    title: String,
    author: String,
    image: String,
    content: String,
});

exports.blogSchema = blogSchema;
module.exports = new mongoose.model("blogs", blogSchema);