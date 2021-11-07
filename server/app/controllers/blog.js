const { getAllBlogs, getBlog, createBlog } = require("../helpers/database.js");

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

async function addBlog(req, res) {
    console.log(req.body);

    const blogObject = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
    };

    const addBlog = await createBlog(blogObject);

    if (addBlog) {
        return res.status(200).json({
            title: "blog added to database",
        });
    }
}

module.exports = {
    getBlogs,
    getBlogsbyID,
    addBlog,
};