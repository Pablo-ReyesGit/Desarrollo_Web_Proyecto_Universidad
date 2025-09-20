module.exports = app => {
    const students = require("../controllers/student.controller.js");
    var router = require("express").Router();

    // Create a new Student
    router.post("/create/", students.create);

    // Retrieve all Students
    router.get("/", students.findAll);

    // Retrieve all active Students
    router.get("/status", students.findAllStatus);

    // Retrieve a single Student with id
    router.get("/:id", students.findOne);

    // Update a Student with id
    router.put("/update/:id", students.update);

    // Delete a Student with id
    router.delete("/delete/:id", students.delete);

    // Delete all Students
    router.delete("/delete/", students.deleteAll);

    // Endpoint base
    app.use("/api/student", router);
};
