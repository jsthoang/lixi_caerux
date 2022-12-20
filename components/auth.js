const jwt = require("jsonwebtoken");
require("dotenv").config();
function authToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send({ Status: "Không có token" });
    jwt.verify(token, process.env.JWT_TOKEN, (err) => {
        if (err) return res.sendStatus(403);
        next();
    });
}

module.exports = authToken;
