const express = require("express");
const bodyparser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const studentsRouter = require("./routers/studentsRouter");
const studentRouter = require("./routers/studentRouter");

const app = express();

//Configuring express to use handlebars

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials")
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
//including __dirname coz the following line gets called when code is running
app.set("views", path.join(__dirname, "./views"));

//middleware for reading json data from request body
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero"
  });
  //res.send("Hello")
});

app.use("/student", studentRouter);
app.use("/students", studentsRouter);

const server = app.listen("8080", (req, res) => {
  console.log(`Server is running on port ${server.address().port}.`);
});
