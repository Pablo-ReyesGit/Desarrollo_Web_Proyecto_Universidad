module.exports = app => {
  const estudiantes = require("../controllers/estudiante.controller.js");
  const router = require("express").Router();

  // Crear nuevo estudiante
  router.post("/", estudiantes.create);

  // Obtener todos los estudiantes
  router.get("/", estudiantes.findAll);

  // Obtener un estudiante por id
  router.get("/:id", estudiantes.findOne);

  // Actualizar un estudiante por id
  router.put("/:id", estudiantes.update);

  // Eliminar un estudiante por id
  router.delete("/:id", estudiantes.delete);

  // Eliminar todos los estudiantes
  router.delete("/", estudiantes.deleteAll);

  // Obtener todos los estudiantes activos (status = true)
  router.get("/status/activos", estudiantes.findAllStatus);

  app.use("/api/estudiantes", router);
};
