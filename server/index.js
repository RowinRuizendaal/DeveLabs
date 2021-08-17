const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./app/routes/router.js");
const dbConnection = require("./app/config/dbConnection.js");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
    },
});

io.on("connection", (socket) => {
    console.log("hoi");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.use(express.static(__dirname + "/public/"));

// Handle SPA
app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(__dirname, "public/index.html"))
);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});