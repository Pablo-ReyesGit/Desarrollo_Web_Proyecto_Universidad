module.exports = app => {
  const materia = require("../controllers/materia.controller.js");
  var router = require("express").Router();

  /**
   * @swagger
   * /api/materia/create:
   *   post:
   *     summary: Crea una nueva materia
   *     description: Inserta una nueva materia en la base de datos.
   *     tags:
   *       - Materia
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nombre
   *               - id_carrera
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: "Matemática I"
   *               creditos:
   *                 type: integer
   *                 example: 5
   *               Semestre:
   *                 type: integer
   *                 example: 30
   *               Obligacion:
   *                 type: boolean
   *                 example: true
   *               nombre_carrera:
   *                 type: string
   *                 example: "Ingenieria en Sistemas"
   *     responses:
   *       200:
   *         description: Materia creada exitosamente
   *       400:
   *         description: Datos incompletos
   *       500:
   *         description: Error en el servidor
   */
  router.post("/create/", materia.create);

  /**
   * @swagger
   * /api/materia:
   *   get:
   *     summary: Obtiene todas las materias
   *     description: Retorna la lista de materias, opcionalmente filtrada por nombre.
   *     tags:
   *       - Materia
   *     parameters:
   *       - in: query
   *         name: nombre
   *         schema:
   *           type: string
   *         required: false
   *         description: Nombre parcial de la materia para filtrar
   *     responses:
   *       200:
   *         description: Lista de materias
   *       500:
   *         description: Error al obtener las materias
   */
  router.get("/", materia.findAll);

  /**
   * @swagger
   * /api/materia/status:
   *   get:
   *     summary: Obtiene todas las materias activas
   *     description: Retorna todas las materias con status = true
   *     tags:
   *       - Materia
   *     responses:
   *       200:
   *         description: Lista de materias activas
   *       500:
   *         description: Error en el servidor
   */
  router.get("/status", materia.findAllStatus);

     //Obtener estudiante por nombre
    /**
   * @swagger
   * /api/estudiante/{nombre}:
   *   get:
   *     summary: Obtener estudiante por nombre
   *     tags: [Materia]
   *     parameters:
   *        - in: path
   *          name: nombre
   *          type: string
   *     description: Obtener estudiante por nombre
   *     responses:
   *       200:
   *         description: Estudiante encontrado
   */
  //Obtener por id estudiante
  router.get("/:nombre", materia.findOne);

  /**
   * @swagger
   * /api/materia/update/{id}:
   *   put:
   *     summary: Actualiza una materia por ID
   *     tags:
   *       - Materia
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la materia
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre:
   *                 type: string
   *                 example: "Programación Avanzada"
   *               creditos:
   *                 type: integer
   *                 example: 6
   *               cupo_maximo:
   *                 type: integer
   *                 example: 40
   *               Obligacion:
   *                 type: boolean
   *                 example: false
   *               nombre_carrera:
   *                 type: string
   *                 example: "Ingeniería en Sistemas"
   *     responses:
   *       200:
   *         description: Materia actualizada exitosamente
   *       404:
   *         description: Materia no encontrada
   *       500:
   *         description: Error al actualizar
   */
  router.put("/update/:id", materia.update);

  /**
   * @swagger
   * /api/materia/delete/{id}:
   *   delete:
   *     summary: Elimina una materia por ID
   *     tags:
   *       - Materia
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID de la materia
   *     responses:
   *       200:
   *         description: Materia eliminada exitosamente
   *       404:
   *         description: Materia no encontrada
   *       500:
   *         description: Error al eliminar
   */
  router.delete("/delete/:id", materia.delete);

  /**
   * @swagger
   * /api/materia/delete:
   *   delete:
   *     summary: Elimina todas las materias
   *     tags:
   *       - Materia
   *     responses:
   *       200:
   *         description: Todas las materias fueron eliminadas
   *       500:
   *         description: Error en el servidor
   */
  router.delete("/delete/", materia.deleteAll);

  app.use("/api/materia", router);
};
