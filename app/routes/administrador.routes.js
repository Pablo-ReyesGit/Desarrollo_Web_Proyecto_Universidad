module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
    var router = require("express").Router();
    // Create a new Administrador 
    router.post("/create/", administrador.create);
    // Retrieve all Administrador
    router.get("/", administrador.findAll);
    // Retrieve all published Administrador
    router.get("/status", administrador.findAllStatus);
    // Retrieve a single Administrador with id
    router.get("/:id_admin", administrador.findOne);
    // Update a Administrador with id
    router.put("/update/:id_admin", administrador.update);
    // Delete a Administrador with id
    router.delete("/delete/:id_admin", administrador.delete);
    // Delete all Administrador
    router.delete("/delete/", administrador.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/administrador", router);
};

