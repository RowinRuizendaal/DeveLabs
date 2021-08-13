const bcrypt = require("bcrypt");
const Users = require("../models/user.js");
const jwt = require("jsonwebtoken");

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

module.exports = {
    checkValidUser,
    findOneUser,
};