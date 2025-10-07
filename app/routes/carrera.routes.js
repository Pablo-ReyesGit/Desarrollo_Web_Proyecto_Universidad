module.exports = app => {
  const carrera = require("../controllers/carrera.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/carrera/create:
   *   post:
   *     summary: Crear una nueva carrera
   *     tags: [Carreras]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: "Ingeniería en Sistemas"
   *               facultad:
   *                 type: string
   *                 example: "Ingeniería"
   *               duracion:
   *                 type: integer
   *                 example: 5
   *     responses:
   *       201:
   *         description: Carrera creada correctamente
   *       400:
   *         description: Datos incompletos
   *       500:
   *         description: Error interno
   */
  router.post("/create", carrera.create);

  /**
   * @swagger
   * /api/carrera:
   *   get:
   *     summary: Obtener todas las carreras
   *     tags: [Carreras]
   *     parameters:
   *       - in: query
   *         name: nombre
   *         schema:
   *           type: string
   *         description: Filtro por nombre de carrera
   *     responses:
   *       200:
   *         description: Lista de carreras
   *       500:
   *         description: Error interno
   */
  router.get("/", carrera.findAll);

  /**
   * @swagger
   * /api/carrera/status:
   *   get:
   *     summary: Obtener todas las carreras activas
   *     tags: [Carreras]
   *     responses:
   *       200:
   *         description: Lista de carreras activas
   *       500:
   *         description: Error interno
   */
  router.get("/status", carrera.findAllStatus);

  /**
   * @swagger
   * /api/carrera/{id}:
   *   get:
   *     summary: Obtener una carrera por ID
   *     tags: [Carreras]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Carrera encontrada
   *       404:
   *         description: No encontrada
   *       500:
   *         description: Error interno
   */
  router.get("/:id", carrera.findOne);

  /**
   * @swagger
   * /api/carrera/update/{id}:
   *   put:
   *     summary: Actualizar una carrera por ID
   *     tags: [Carreras]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *               facultad:
   *                 type: string
   *               duracion:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Carrera actualizada correctamente
   *       400:
   *         description: No se enviaron campos
   *       404:
   *         description: Carrera no encontrada
   *       500:
   *         description: Error interno
   */
  router.put("/update/:id", carrera.update);

  /**
   * @swagger
   * /api/carrera/delete/{id}:
   *   delete:
   *     summary: Eliminar una carrera por ID
   *     tags: [Carreras]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Carrera eliminada correctamente
   *       404:
   *         description: Carrera no encontrada
   *       500:
   *         description: Error interno
   */
  router.delete("/delete/:id", carrera.delete);

  // Montar las rutas
  app.use("/api/carrera", router);
};
