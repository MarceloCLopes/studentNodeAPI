const express = require("express");
const router = express.Router();

const StudentModel = require("../model/StudentModel");

/**
 * Add Student Api
 * Method:POST
 */

router.post("/add_student", async (req, res, next) => {
  try {
    const student = await StudentModel.findOne({ phone: req.body.phone });

    if (student) {
      return res.json({
        success: false,
        message: "Student already registered with this phone number.",
      });
    } else {
      let newStudent = await StudentModel.create(req.body);

      res.json({
        success: true,
        message: "Student added successfully",
        student: newStudent,
      });
    }
  } catch (error) {
    next(error);
  }

  res.json({
    success: true,
    message: "Student added successfully.",
  });
});

/**
 * Get all students
 * Method:GET
 */

router.get("/all_students", async (req, res, next) => {
  try {
    const student = await StudentModel.find({});

    res.json({
      success: true,
      total: student.length,
      student: student,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get Single student by Id
 * Method:GET
 */

router.get("/single_student/:id", async (req, res, next) => {
  try {
    // check if student exist or not
    let student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.json({
        success: false,
        message: "Student ID doesn't exist",
      });
    } else {
      res.json({
        success: true,
        message: "Student found sucessfully",
        student: student,
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Update a single student data
 * Method:PUT
 */

router.put("/update_student/:id", async (req, res, next) => {
  try {
    let student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.json({
        success: false,
        message: "Student ID doesn't exist",
      });
    } else {
      let updateStudent = await StudentModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidator: true,
        }
      );

      res.json({
        success: false,
        message: "Student updated successfully.",
        student: updateStudent,
      });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * Delete a single student data
 * Method:Delete
 */

router.delete("/delete_student/:id", async (req, res, next) => {
  try {
    let student = await StudentModel.findById(req.params.id);

    if (!student) {
      return res.json({
        success: false,
        message: "Student ID doesn't exist",
      });
    } else {
      await student.remove();
      res.json({
        success: true,
        message: `Student with id ${req.params.id} deleted successfully`,
        student: {},
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
