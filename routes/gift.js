const express = require("express");
const router = express.Router();

const gift_json = require("../lixi/gift.json");

router.get("/", (req, res) => {
    console.log("gift-json is oke");
    router.send(JSON.stringify(gift_json));
});
