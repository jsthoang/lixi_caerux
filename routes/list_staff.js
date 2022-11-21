const express = require("express");
const router = express.Router();
const fs = require("fs");
const listStaff_json = require("../lixi/listStaff.json");
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get("/", (req, res) => {
    res.send(JSON.stringify(listStaff_json));
});
router.get("/:id", (req, res) => {
    const userId = req.params["id"];
    res.send(JSON.stringify(listStaff_json[userId]));
});
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post("/", (req, res) => {
    fs.writeFile("./lixi/listStaff.json", JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
});
router.put("/:id", (req, res) => {
    const userId = req.params["id"];
    listStaff_json[userId] = req.body;
    fs.writeFile("./lixi/listStaff.json", JSON.stringify(listStaff_json), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
});

module.exports = router;
