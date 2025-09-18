module.exports = app => {
    const carrera = require("../controllers/carrera.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", carrera.create);
    // Retrieve all Client
    router.get("/", carrera.findAll);
    // Retrieve all published Clients
    router.get("/status", carrera.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", carrera.findOne);
    // Update a Client with id
    router.put("/update/:id", carrera.update);
    // Delete a Client with id
    router.delete("/delete/:id", carrera.delete);
    // Delete all Cliente
    router.delete("/delete/", carrera.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/carrera", router);
};