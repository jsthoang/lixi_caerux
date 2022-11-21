const express = require("express");
const router = express.Router();
const fs = require("fs");
const listStaff_json = require("../lixi/listStaff.json");

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
    console.log(req.body);
    fs.writeFile("./lixi/listStaff.json", JSON.stringify(req.body), (err) => {
        if (err) console.log(err);
        else {
            console.log("File written successfully");
        }
    });
    res.send({ Status: "Ban da post thanh cong" });
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
