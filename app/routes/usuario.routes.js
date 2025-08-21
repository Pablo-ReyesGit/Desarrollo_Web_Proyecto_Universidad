module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", usuario.create);
    // Retrieve all Client
    router.get("/", usuario.findAll);
    // Retrieve all published Client
    router.get("/status", usuario.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", usuario.findOne);
    // Update a Client with id
    router.put("/update/:id", usuario.update);
    // Delete a Client with id
    router.delete("/delete/:id", usuario.delete);
    // Delete all Cliente
    router.delete("/delete/", usuario.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/usuario", router);
};