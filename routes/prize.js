const express = require("express");
const router = express.Router();
const fs = require("fs");
const prize_json = require("../lixi/prize.json");
const authToken = require("../components/auth");
router.get("/", (req, res) => {
    res.send(JSON.stringify(prize_json));
});
router.get("/:id", (req, res) => {
    const userId = req.params["id"];
    res.send(JSON.stringify(prize_json[userId]));
});
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post("/", authToken, (req, res) => {
    fs.writeFile("./lixi/prize.json", JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
    res.send({ Status: "Ban da POST thanh cong" });
});

router.put("/:id", authToken, (req, res) => {
    const userId = req.params["id"];
    prize_json[userId] = req.body;
    if ((req.body.number = 0)) {
        prize_json[userId].percentage = 0;
    }
    fs.writeFile("./lixi/prize.json", JSON.stringify(prize_json), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });

    res.send({ Status: "Ban da PUT thanh cong" });
});

module.exports = router;
