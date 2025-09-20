module.exports = app => {
    const materia = require("../controllers/materia.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", materia.create);
    // Retrieve all Client
    router.get("/", materia.findAll);
    // Retrieve all published Clients
    router.get("/status", materia.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", materia.findOne);
    // Update a Client with id
    router.put("/update/:id", materia.update);
    // Delete a Client with id
    router.delete("/delete/:id", materia.delete);
    // Delete all Cliente
    router.delete("/delete/", materia.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/materia", router);
};