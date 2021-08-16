const { getAllBlogs } = require("../helpers/database.js");

async function getBlogs(req, res) {
    // Get all blogs
    const getBlogs = await getAllBlogs();

    if (getBlogs) {
        return res.status(200).json({
            title: "Blogs has been fetched",
            getBlogs,
        });
    }
}

module.exports = {
    getBlogs,
};