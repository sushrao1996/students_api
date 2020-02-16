const express = require("express");
const students = require("../models/Students");
const studentRouter = express.Router();

studentRouter
  .get("/:id", (req, res) => {
    // const studentId = req.params.id;
    const { id = "" } = req.params;
    const requiredStudent = students.find(student => {
      if (parseInt(id) === student.id) return true;
      else return false;
    });
    if (requiredStudent) {
      res.status(200).json({ student: requiredStudent });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  })
  .post("/", (req, res) => {
    if (req.body.FirstName && req.body.LastName) {
      students.push(req.body);
      res.status(200);
      res.json({ message: "Studensts created Successfully" });
    } else {
      res.status(400).send("Bad Request");
    }
  })

  .patch("/:id", (req, res) => {
    const { id } = req.params;

    let requiredStudentIndex;
    const requiredStudent = students.find((student, studentIndex) => {
      if (parseInt(id) === student.id) {
        requiredStudentIndex = studentIndex;
        return true;
      } else return false;
    });

    if (requiredStudent) {
      const {
        FirstName = requiredStudent.FirstName,
        LastName = requiredStudent.LastName,
        Age = requiredStudent.Age,
        gender = requiredStudent.gender,
        scores = requiredStudent.scores
      } = req.body;
      students[requiredStudentIndex] = {
        id: requiredStudent.id,
        FirstName,
        LastName,
        Age,
        gender,
        scores
      };
      res.status(200).send({ message: "Student Details Updated" });
    }
    res.status(400).send({ message: "Bad Request" });
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;

    let requiredStudentIndex;
    const requiredStudent = students.find((student, studentIndex) => {
      if (parseInt(id) === student.id) {
        requiredStudentIndex = studentIndex;
        return true;
      } else return false;
    });
    if (requiredStudent) {
      students.splice(requiredStudentIndex, 1);
      res.status(200).send({ message: "Student Removed" });
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  });

module.exports = studentRouter;
