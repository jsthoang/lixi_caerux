const express = require("express");
const app = express();
// Router
const listStaff_Router = require("./routes/list_staff");
const prize_Router = require("./routes/prize");
const gift_Router = require("./routes/gift");
const nunjucks = require("nunjucks");
const authToken = require("./components/auth");
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.njk");
});

app.post("/", (req, res) => {
    console.log(req.body);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/list-staff", listStaff_Router);
app.use("/prize", prize_Router);
app.use("/gift", gift_Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on: http://localhost:${PORT}`));
