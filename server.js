const express = require("express");
const app = express();
// Router
const listStaff_Router = require("./routes/list_staff");
const prize_Router = require("./routes/prize");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/list-staff", listStaff_Router);
app.use("/prize", prize_Router);

app.listen(3000);
