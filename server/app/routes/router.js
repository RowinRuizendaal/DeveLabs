const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.js");

router
    .post("/api/login", userControllers.handleLogin) // login
    .get("/api/user", userControllers.handleUser); // Get user

module.exports = router;