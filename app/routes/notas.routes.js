module.exports = app => {
  const nota = require("../controllers/notas.controller.js");
  var router = require("express").Router();

  // Create a new Nota
  /**
   * @swagger
   * /api/notas/create:
   *   post:
   *     summary: Crear una nueva nota para un estudiante inscrito en un curso
   *     tags: [Notas]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre_materia:
   *                 type: string
   *                 example: "Matemática I"
   *               periodo:
   *                 type: string
   *                 example: "2025-1"
   *               carnet_estudiante:
   *                 type: string
   *                 example: "E2025001"
   *               primer_parcial:
   *                 type: number
   *                 example: 25
   *               segundo_parcial:
   *                 type: number
   *                 example: 28
   *               parcial_final:
   *                 type: number
   *                 example: 30
   *               actividades:
   *                 type: number
   *                 example: 15
   *     responses:
   *       201:
   *         description: Nota creada correctamente
   *       400:
   *         description: Faltan campos requeridos
   *       404:
   *         description: Estudiante, materia o curso no encontrado
   *       500:
   *         description: Error interno
   */
  router.post("/create", nota.create);

  // Retrieve all Notas
  /**
   * @swagger
   * /api/notas:
   *   get:
   *     summary: Obtener todas las notas registradas
   *     tags: [Notas]
   *     responses:
   *       200:
   *         description: Lista de notas
   *       500:
   *         description: Error al obtener las notas
   */
  router.get("/", nota.findAll);

  // Retrieve a single Nota
  /**
   * @swagger
   * /api/notas/{id}:
   *   get:
   *     summary: Obtener una nota por ID
   *     tags: [Notas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Nota encontrada
   *       404:
   *         description: Nota no encontrada
   *       500:
   *         description: Error interno
   */
  router.get("/:id", nota.findOne);

  // Update a Nota
  /**
   * @swagger
   * /api/notas/update/{id}:
   *   put:
   *     summary: Actualizar una nota por ID
   *     tags: [Notas]
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
   *               nombre_materia:
   *                 type: string
   *               periodo:
   *                 type: string
   *               carnet_estudiante:
   *                 type: string
   *               primer_parcial:
   *                 type: number
   *               segundo_parcial:
   *                 type: number
   *               parcial_final:
   *                 type: number
   *               actividades:
   *                 type: number
   *     responses:
   *       200:
   *         description: Nota actualizada correctamente
   *       400:
   *         description: No se enviaron campos para actualizar
   *       404:
   *         description: Nota no encontrada
   *       500:
   *         description: Error interno
   */
  router.put("/update/:id", nota.update);

  // Delete a Nota
  /**
   * @swagger
   * /api/notas/delete/{id}:
   *   delete:
   *     summary: Eliminar una nota por ID
   *     tags: [Notas]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Nota eliminada correctamente
   *       404:
   *         description: Nota no encontrada
   *       500:
   *         description: Error interno
   */
  router.delete("/delete/:id", nota.delete);

  // Montar las rutas en /api/notas
  app.use("/api/notas", router);
};
