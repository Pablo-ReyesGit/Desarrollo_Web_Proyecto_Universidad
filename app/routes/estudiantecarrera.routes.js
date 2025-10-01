module.exports = app => {
    const estudianteCarrera = require("../controllers/estudiantecarrera.controller.js");
    var router = require("express").Router();

    router.post("/create", estudianteCarrera.create);
    router.get("/", estudianteCarrera.findAll);
    router.get("/:id", estudianteCarrera.findOne);
    router.put("/update/:id", estudianteCarrera.update);
    router.delete("/delete/:id", estudianteCarrera.delete);

    app.use("/api/estudiantecarrera", router);
};
