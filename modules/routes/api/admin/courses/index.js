const express = require("express");

const router = express.Router();

//Model

const Course = require("./../../../../models/Course");

//get as list
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

//Craete new course
router.post("/courses", async (req, res) => {
  try {
    //Validation

    const newCourse = new Course({
      title: req.body.title,
      body: req.body.body,
      price: req.body.price,
      image: req.body.image,
    });

    console.log("before store course", newCourse);

    const savedCourse = await newCourse.save();

    console.log("After store course", savedCourse);

    res.status(200).json({ message: "Course created", data: savedCourse });
  } catch (error) {
    console.log("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
});

//find one document
router.get("/courses/:id", async (req, res) => {
  try {
    const paramId = req.params.id;

    if (!paramId) {
      return res.status(404).json({
        message: "Not found any course",
      });
    }

    const course = await Course.findById(req.params.id);

    res.json({
      message: "Success",
      data: course,
    });
  } catch (error) {
    throw error;
  }
});

//update one document
router.put("/courses/:id", async (req, res) => {
  try {
    //Validatonn

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        price: req.body.price,
        image: req.body.image,
      },
      {
        new: true,
        runValidators: false,
      }
    );

    console.log(updatedCourse, "UPDATED COURS");

    res.json({ data: updatedCourse });
  } catch (error) {
    throw error;
  }
});

//delete one document
router.delete("/courses/:id", async (req, res) => {
  try {
    const paramId = req.params.id;

    if (!paramId) {
      return res.status(404).json({
        message: "Not found any course",
      });
    }

    const findedCourse = await Course.findByIdAndDelete(paramId);

    res.json({ message: "successfully deleted", data: findedCourse });
  } catch (error) {
    throw error;
  }
});

module.exports = router;
