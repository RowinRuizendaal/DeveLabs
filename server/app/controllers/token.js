const { authenticateToken } = require("../middleware/authenticateToken");
const jwt = require("jsonwebtoken");

async function checkToken(req, res) {
    const token = req.params.token;
    if (token == null || token === "") return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                title: "invalid token",
            });
        }
        return res.status(200).json({
            title: "valid token",
        });
    });
}

module.exports = {
    checkToken,
};