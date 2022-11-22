const express = require("express");
const router = express.Router();
const fs = require("fs");
const gift_json = require("../lixi/gift.json");

router.get("/", (req, res) => {
    res.send(JSON.stringify(gift_json));
});
router.get("/:id", (req, res) => {
    const userId = req.params["id"];
    res.send(JSON.stringify(gift_json[userId]));
});
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post("/", (req, res) => {
    fs.writeFile("./lixi/gift.json", JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
    res.send({ Status: "Ban da POST thanh cong" });
});

router.put("/", (req, res) => {
    const userId = req.params["id"];
    gift_json = req.body;
    fs.writeFile("./lixi/gift.json", JSON.stringify(gift_json), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
    res.send({ Status: "Ban da PUT thanh cong" });
});

module.exports = router;
