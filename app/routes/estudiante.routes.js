module.exports = app => {
  const estudiantes = require("../controllers/estudiante.controller.js");
  const router = require("express").Router();

<<<<<<< HEAD
  /**
   * @swagger
   * /api/estudiantes:
   *   post:
   *     summary: Crear un nuevo Estudiante
   *     tags: [Estudiantes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - fullname
   *             properties:
   *               fullname:
   *                 type: string
   *                 example: Pedro José
   *               fechaNacimiento:
   *                 type: string
   *                 format: date
   *                 example: 2000-05-22
   *               dpi:
   *                 type: string
   *                 example: 1234567890101
   *               ingreso:
   *                 type: string
   *                 format: date
   *                 example: 2025-01-10
   *               status:
   *                 type: boolean
   *                 example: true
   *     responses:
   *       200:
   *         description: Estudiante creado correctamente.
   *       400:
   *         description: El nombre no puede estar vacío.
   *       500:
   *         description: Error al crear Estudiante.
   */
  router.post("/", estudiantes.create);

  /**
   * @swagger
   * /api/estudiantes:
   *   get:
   *     summary: Obtener todos los Estudiantes
   *     tags: [Estudiantes]
   *     parameters:
   *       - in: query
   *         name: fullname
   *         schema:
   *           type: string
   *         description: Filtrar por nombre
   *     responses:
   *       200:
   *         description: Lista de Estudiantes obtenida correctamente.
   *       500:
   *         description: Error al obtener Estudiantes.
   */
  router.get("/", estudiantes.findAll);

  /**
   * @swagger
   * /api/estudiantes/{id}:
   *   get:
   *     summary: Obtener un Estudiante por ID
   *     tags: [Estudiantes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Estudiante encontrado.
   *       404:
   *         description: No se encontró el Estudiante.
   *       500:
   *         description: Error al obtener el Estudiante.
   */
  router.get("/:id", estudiantes.findOne);

  /**
   * @swagger
   * /api/estudiantes/{id}:
   *   put:
   *     summary: Actualizar un Estudiante por ID
   *     tags: [Estudiantes]
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
   *               fullname:
   *                 type: string
   *               carnet:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Estudiante actualizado correctamente.
   *       400:
   *         description: Datos inválidos.
   *       404:
   *         description: Estudiante no encontrado.
   *       500:
   *         description: Error al actualizar Estudiante.
   */
  router.put("/:id", estudiantes.update);

  /**
   * @swagger
   * /api/estudiantes/{id}:
   *   delete:
   *     summary: Eliminar un Estudiante por ID
   *     tags: [Estudiantes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Estudiante eliminado correctamente.
   *       404:
   *         description: Estudiante no encontrado.
   *       500:
   *         description: Error al eliminar Estudiante.
   */
  router.delete("/:id", estudiantes.delete);

  /**
   * @swagger
   * /api/estudiantes:
   *   delete:
   *     summary: Eliminar todos los Estudiantes
   *     tags: [Estudiantes]
   *     responses:
   *       200:
   *         description: Todos los Estudiantes fueron eliminados correctamente.
   *       500:
   *         description: Error al eliminar Estudiantes.
   */
  router.delete("/", estudiantes.deleteAll);

  /**
   * @swagger
   * /api/estudiantes/status/activos:
   *   get:
   *     summary: Obtener todos los Estudiantes activos (status = true)
   *     tags: [Estudiantes]
   *     responses:
   *       200:
   *         description: Lista de Estudiantes activos.
   *       500:
   *         description: Error al obtener Estudiantes activos.
   */
=======
  // Crear nuevo estudiante
  /**
 * @swagger
 * /api/estudiantes:
 *   post:
 *     summary: Crear un nuevo Estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Pedro José
 *               carnet:
 *                 type: string
 *                 example: 2025001
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 example: 2000-05-22
 *               dpi:
 *                 type: string
 *                 example: 1234567890101
 *               ingreso:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-10
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Estudiante creado correctamente.
 *       400:
 *         description: El nombre no puede estar vacío.
 *       500:
 *         description: Error al crear Estudiante.
 */
  router.post("/", estudiantes.create);

  // Obtener todos los estudiantes
  /**
 * @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtener todos los Estudiantes
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: fullname
 *         schema:
 *           type: string
 *         description: Filtrar por nombre
 *     responses:
 *       200:
 *         description: Lista de Estudiantes obtenida correctamente.
 *       500:
 *         description: Error al obtener Estudiantes.
 */
  router.get("/", estudiantes.findAll);

  // Obtener un estudiante por id
  /**
 * @swagger
 * /api/estudiantes/{id}:
 *   get:
 *     summary: Obtener un Estudiante por ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante encontrado.
 *       404:
 *         description: No se encontró el Estudiante.
 *       500:
 *         description: Error al obtener el Estudiante.
 */
  router.get("/:id", estudiantes.findOne);

  // Actualizar un estudiante por id
  /**
 * @swagger
 * /api/estudiantes/{id}:
 *   put:
 *     summary: Actualizar un Estudiante por ID
 *     tags: [Estudiantes]
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
 *               fullname:
 *                 type: string
 *               carnet:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estudiante actualizado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error al actualizar Estudiante.
 */
  router.put("/:id", estudiantes.update);

  // Eliminar un estudiante por id
  /**
 * @swagger
 * /api/estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un Estudiante por ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estudiante eliminado correctamente.
 *       404:
 *         description: Estudiante no encontrado.
 *       500:
 *         description: Error al eliminar Estudiante.
 */
  router.delete("/:id", estudiantes.delete);

  // Eliminar todos los estudiantes

/**
 * @swagger
 * /api/estudiantes:
 *   delete:
 *     summary: Eliminar todos los Estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Todos los Estudiantes fueron eliminados correctamente.
 *       500:
 *         description: Error al eliminar Estudiantes.
 */
  router.delete("/", estudiantes.deleteAll);

  // Obtener todos los estudiantes activos (status = true)
  /**
 * @swagger
 * /api/estudiantes/status/activos:
 *   get:
 *     summary: Obtener todos los Estudiantes activos (status = true)
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de Estudiantes activos.
 *       500:
 *         description: Error al obtener Estudiantes activos.
 */
>>>>>>> 691eba747accc67ed4b28cf6207416fe1ce6fdfd
  router.get("/status/activos", estudiantes.findAllStatus);

  app.use("/api/estudiantes", router);
};
