const express = require("express");
const router = express.Router();

const prize_json = require("../lixi/prize.json");

router.get("/", (red, res) => {
    console.log("prize-ok");
    res.send(JSON.stringify(prize_json));
});

module.exports = router;
