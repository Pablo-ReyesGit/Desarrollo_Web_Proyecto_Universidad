module.exports = app => {
    const horario = require("../controllers/horario.controller.js");
    var router = require("express").Router();

    router.post("/create", horario.create);
    router.get("/", horario.findAll);
    router.get("/:id", horario.findOne);
    router.put("/update/:id", horario.update);
    router.delete("/delete/:id", horario.delete);

    app.use("/api/horario", router);
};
