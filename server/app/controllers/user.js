const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const axios = require("axios");

const {
    checkValidUser,
    findOneUser,
    createUser,
    getAllUsers,
} = require("../helpers/database.js");

async function handleLogin(req, res) {
    const user = await checkValidUser(req.body.userName, req.body.password);

    if (user == null || user === false) {
        return res.sendStatus(400);
    } else {
        let token = jwt.sign({ userId: user._id }, process.env.SECRET);
        return res.status(200).json({
            title: "Login sucessfull",
            token: token,
        });
    }
}

async function handleUser(req, res) {
    let userData = await findOneUser(req.user.userId);

    if (userData) {
        return res.status(200).json({
            title: "User found",
            userData,
        });
    }
}

async function handleUsers(req, res) {
    let getUsers = await getAllUsers();

    if (getUsers) {
        return res.status(200).json({
            title: "User data has been fetched",
            getUsers,
        });
    }
    console.log(getUsers);
}

async function registerUser(req, res) {
    //Salt the plain password
    const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

    const width = Math.floor(Math.random() * 1200) + 1;
    const height = Math.floor(Math.random() * 900) + 1;

    const userObject = {
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        password: passwordHash,
        profilepicture: `https://source.unsplash.com/random/${height}x${width}`,
    };

    const newUser = await createUser(userObject);

    if (newUser) {
        return res.status(200).json({
            title: "User added to database",
        });
    }
}

module.exports = {
    handleLogin,
    handleUser,
    registerUser,
    handleUsers,
};