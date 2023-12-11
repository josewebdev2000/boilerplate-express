require("dotenv").config();
let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase")
    {
        res.json({"message": "HELLO JSON"});
    }
    else
    {
        res.json({"message": "Hello json"});
    }
});

app.get(
    "/now", 
    (req, res, next) => {
        req.time = new Date().toString();
        next();
    }, 
    (req, res) => {
        return res.json({time: req.time});
    }
);

app.get("/:word/echo", (req, res) => {
    return res.json({echo: req.params.word});
});

app.route("/name")
   .get((req, res) => {
    const { firstname, lastname } = req.query;
    return res.json({name: `${firstname} ${lastname}`});
   });



































 module.exports = app;
