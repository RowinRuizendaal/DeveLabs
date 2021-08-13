const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const { checkValidUser, findOneUser } = require("../helpers/database.js");

async function handleLogin(req, res) {
    const user = await checkValidUser(req.body.userName, req.body.password);

    if (user == null || user === false) {
        return res.sendStatus(400);
    } else {
        let token = jwt.sign({ userId: user._id }, "JWTSECRET");
        return res.status(200).json({
            title: "Login sucessfull",
            token: token,
        });
    }
}

async function handleUser(req, res) {
    let token = req.headers.token; // JWT token

    jwt.verify(token, "JWTSECRET", async(err, decoded) => {
        if (err)
            return res.status(401).json({
                title: "unauthorized",
            });

        // token is valid
        let userData = await findOneUser(decoded.userId);

        if (userData) {
            return res.status(200).json({
                title: "User found",
                userData,
            });
        }
    });
}

module.exports = {
    handleLogin,
    handleUser,
};