const express = require("express");
const students = require("../models/Students");

const studentsRouter = express.Router();

studentsRouter.get("/", (req, res) => {
  //express is smart enough to figure out the response header's mime type
  res.status(200);
  //explicit representation of status codes and response types.
  res.json({ students });
});
module.exports = studentsRouter;
