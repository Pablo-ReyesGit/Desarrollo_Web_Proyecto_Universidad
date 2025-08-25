module.exports = app => {
    const docente = require("../controllers/docente.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", docente.create);
    // Retrieve all Client
    router.get("/", docente.findAll);
    // Retrieve all published Clients
    router.get("/status", docente.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", docente.findOne);
    // Update a Client with id
    router.put("/update/:id", docente.update);
    // Delete a Client with id
    router.delete("/delete/:id", docente.delete);
    // Delete all Cliente
    router.delete("/delete/", docente.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/docente", router);
};