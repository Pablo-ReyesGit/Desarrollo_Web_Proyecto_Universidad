module.exports = app => {
    const curso = require("../controllers/materia.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", curso.create);
    // Retrieve all Client
    router.get("/", curso.findAll);
    // Retrieve all published Clients
    router.get("/status", curso.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", curso.findOne);
    // Update a Client with id
    router.put("/update/:id", curso.update);
    // Delete a Client with id
    router.delete("/delete/:id", curso.delete);
    // Delete all Cliente
    router.delete("/delete/", curso.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/curso", router);
};