const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.js");
const blogControllers = require("../controllers/blog.js");
const tokenControllers = require("../controllers/token.js");

const { authenticateToken } = require("../middleware/authenticateToken.js");

router
    .get("/api/verify/:token", tokenControllers.checkToken) // login
    .post("/api/login", userControllers.handleLogin) // login
    .post("/api/register", userControllers.registerUser) // register user
    .get("/api/user", authenticateToken, userControllers.handleUser) // Get user
    .get("/api/users", authenticateToken, userControllers.handleUsers) // Get users
    .get("/api/blogs", authenticateToken, blogControllers.getBlogs) // Get blogs
    .get("/api/blogs/:id", authenticateToken, blogControllers.getBlogsbyID) // Get specific blog based on id
    .post("/api/addblog", authenticateToken, blogControllers.addBlog) // Add a new blog
    //Public API
    .get("/api/public/blogs", blogControllers.getBlogs) // Get blogs
    .get("/api/public/blogs/:id", blogControllers.getBlogsbyID); // Get specific blog based on id

module.exports = router;