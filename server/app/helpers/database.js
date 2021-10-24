const bcrypt = require("bcrypt");
const Users = require("../models/user.js");
const Blogs = require("../models/blogs.js");
const ObjectId = require("mongoose").Types.ObjectId;

async function checkValidUser(email, password) {
    const user = await Users.findOne({
        emailAddress: email,
    });

    // If user exist with email
    if (user) {
        const compareSalt = await bcrypt.compare(password, user.password);

        // If salt is true
        if (compareSalt) {
            return user;
        }
    }
    // No user has been found so return false
    return false;
}

async function findOneUser(id) {
    const user = await Users.findOne({
        _id: id,
    });

    if (user) {
        return user;
    }
}

/**
 * Create new user
 *
 * @param {Object} userCredentials - Data of the new registered user
 *
 */

async function createUser({ name, emailAddress, password, profilepicture }) {
    const newUser = await Users.create({
        name: name,
        emailAddress: emailAddress,
        password: password,
        profilepicture: profilepicture,
    });

    return newUser;
}

async function getAllBlogs() {
    const blogs = await Blogs.find();

    if (blogs) {
        return blogs;
    }

    console.log("Error gettings blogs");
}

async function getBlog(blogID) {
    const blogs = await Blogs.findOne({ _id: blogID }).catch((err) =>
        console.log(err)
    );

    if (blogs) {
        return blogs;
    }

    console.log("Error gettings blogs");
}

async function getAllUsers() {
    const users = await Users.find()
        .select(["-password"])
        .catch((err) => {
            console.log(err);
        });

    return users;
}

module.exports = {
    checkValidUser,
    findOneUser,
    createUser,
    getAllBlogs,
    getBlog,
    getAllUsers,
};