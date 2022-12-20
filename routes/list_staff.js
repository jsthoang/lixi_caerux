const express = require("express");
const router = express.Router();
const fs = require("fs");
const listStaff_json = require("../lixi/listStaff.json");
const jwt = require("jsonwebtoken");
const authToken = require("../components/auth.js");
router.get("/", (req, res) => {
    // res.send(JSON.stringify(listStaff_json));
    res.sendStatus(403);
});
router.get("/:id", (req, res) => {
    // const userId = req.params["id"];
    // res.send(JSON.stringify(listStaff_json[userId]));
    res.sendStatus(403);
});
router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

router.post("/", (req, res) => {
    // fs.writeFile("./lixi/listStaff.json", JSON.stringify(req.body), (err) => {
    //     if (err) console.log(err);
    //     else {
    //         console.log("File written successfully");
    //     }
    // });
    // res.send({ Status: "Ban da POST thanh cong" });
    console.log(req.body);
    let user_info_index = listStaff_json.findIndex((item) => {
        if (item.email === req.body.email && item.password === req.body.password) return item;
    });
    if (listStaff_json[user_info_index].timesSpin > 0) {
        const accessToken = jwt.sign(req.body, process.env.JWT_TOKEN);
        res.send({ user: listStaff_json[user_info_index], token: { accessToken: accessToken } });
    } else {
        res.send({ user: listStaff_json[user_info_index], token: 0 });
        res.sendStatus(401);
    }
});

router.put("/:id", authToken, (req, res) => {
    const userId = req.body.id - 1;
    if (listStaff_json[userId].timesSpin === 1 && req.body.timesSpin === 0) {
        listStaff_json[userId] = req.body;
        console.log(listStaff_json[userId]);
        fs.writeFile("./lixi/listStaff.json", JSON.stringify(listStaff_json), (err) => {
            if (err) console.log(err);
            else {
                console.log("File written successfully");
            }
        });
        res.status(200).send({ Status: "Ban da PUT thanh cong" });
    } else if (listStaff_json[userId].timesSpin === 0 && req.body.timesSpin === 0) {
        res.status(405).send({ Status: "User da het luot quay" });
    } else {
        res.status(405).send({ Status: "Error" });
    }
});

module.exports = router;
