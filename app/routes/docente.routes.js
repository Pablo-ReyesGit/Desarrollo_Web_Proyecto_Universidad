// routes/docente.routes.js
module.exports = app => {
  const docente = require("../controllers/docente.controller.js");
  var router = require("express").Router();

  // Crear Docente
  /**
   * @swagger
   * /api/docente/create/:
   *   post:
   *     summary: Crear docente
   *     tags: [Docente]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *                DPI:
   *                  type: string
   *                nombre:
   *                  type: string
   *                apellido:
   *                  type: string
   *                fechaNacimiento:
   *                  type: string
   *                  format: date
   *                genero:
   *                  type: string
   *                sueldo:
   *                  type: number
   *                id_usuario:
   *                  type: integer
   *     responses:
   *       201:
   *         description: Docente creado exitosamente
   *       400:
   *         description: Error en la petición
   *       500:
   *         description: Error en el servidor
   */
  router.post("/create/", docente.create);

  // Asignar carrera a docente
  /**
   * @swagger
   * /api/docente/asignar/{carnet}:
   *   put:
   *     summary: Asignar carrera a un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: carnet
   *         required: true
   *         schema:
   *           type: string
   *         description: Carnet del docente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre_carrera:
   *                 type: string
   *                 description: Nombre de la carrera a asignar
   *     responses:
   *       200:
   *         description: Carrera asignada correctamente
   *       404:
   *         description: Carrera o Docente no encontrados
   *       500:
   *         description: Error en el servidor
   */
  router.put("/asignar/:carnet", docente.asignacionCarrera);

  // Desasignar carrera
  /**
   * @swagger
   * /api/docente/desasignar/{carnet}:
   *   put:
   *     summary: Desasignar la carrera de un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: carnet
   *         required: true
   *         schema:
   *           type: string
   *         description: Carnet del docente
   *     responses:
   *       200:
   *         description: Carrera desasignada correctamente
   *       404:
   *         description: Docente no encontrado
   *       500:
   *         description: Error en el servidor
   */
  router.put("/desasignar/:carnet", docente.desasignacionCarrera);

  // Obtener todos los docentes
  /**
   * @swagger
   * /api/docente/:
   *   get:
   *     summary: Obtener todos los docentes
   *     tags: [Docente]
   *     responses:
   *       200:
   *         description: Lista de docentes
   *       500:
   *         description: Error en el servidor
   */
  router.get("/", docente.findAll);

  // Obtener docentes activos
  /**
   * @swagger
   * /api/docente/status:
   *   get:
   *     summary: Obtener todos los docentes activos
   *     tags: [Docente]
   *     responses:
   *       200:
   *         description: Lista de docentes activos
   *       500:
   *         description: Error en el servidor
   */
  router.get("/status", docente.findAllStatus);

  // Obtener docente por carnet
  /**
   * @swagger
   * /api/docente/{carnet}:
   *   get:
   *     summary: Obtener un docente por carnet
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: carnet
   *         required: true
   *         schema:
   *           type: string
   *         description: Carnet del docente
   *     responses:
   *       200:
   *         description: Docente encontrado
   *       404:
   *         description: No se encontró el docente
   *       500:
   *         description: Error en el servidor
   */
  router.get("/:carnet", docente.getByCarnet);

  // Update Docente
  /**
   * @swagger
   * /api/docente/update/{carnet}:
   *   put:
   *     summary: Actualizar datos de un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: carnet
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *     responses:
   *       200:
   *         description: Docente actualizado
   *       404:
   *         description: No se encontró el docente
   *       500:
   *         description: Error en el servidor
   */
  router.put("/update/:carnet", docente.update);

  // Delete Docente
  /**
   * @swagger
   * /api/docente/delete/{carnet}:
   *   delete:
   *     summary: Eliminar un docente
   *     tags: [Docente]
   *     parameters:
   *       - in: path
   *         name: carnet
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Docente eliminado
   *       404:
   *         description: No se encontró el docente
   *       500:
   *         description: Error en el servidor
   */
  router.delete("/delete/:carnet", docente.delete);
  app.use("/api/docente", router);
};