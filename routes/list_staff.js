const express = require("express");
const router = express.Router();

const listStaff_json = require("../lixi/listStaff.json");

router.get("/", (req, res) => {
    console.log("ehhe");
    // res.send("hello");
    res.send(JSON.stringify(listStaff_json));
});

module.exports = router;
