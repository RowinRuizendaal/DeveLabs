const express = require("express");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null || token === "") return res.sendStatus(401);

    jwt.verify(token, "JWTSECRET", (err, user) => {
        if (err)
            return res.status(403).json({
                title: "unauthorized",
            });
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};