const { getAllBlogs, getBlog } = require("../helpers/database.js");

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

async function getBlogsbyID(req, res) {
    const id = req.params.id;

    // Get blogs based on id
    const blog = await getBlog(id);

    if (blog) {
        return res.status(200).json({
            title: "Blog has been fetched",
            blog,
        });
    }
}

module.exports = {
    getBlogs,
    getBlogsbyID,
};