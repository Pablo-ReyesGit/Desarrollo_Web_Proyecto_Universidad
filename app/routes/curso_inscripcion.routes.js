module.exports = app => {
    const curso = require("../controllers/curso_inscripcion.controller.js");
    var router = require("express").Router();
    // Create a new Client
/**
 * @swagger
 * /api/inscripcion/create:
 *   post:
 *     summary: Crear una nueva inscripción a curso
 *     tags: [Inscripciones]
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
 *               estado:
 *                 type: boolean
 *                 example: "true"
 *     responses:
 *       201:
 *         description: Inscripción creada correctamente
 *       400:
 *         description: Faltan campos requeridos
 *       404:
 *         description: Estudiante o curso no encontrado
 */

    router.post("/create/", curso.create);
    // Retrieve all Client
/**
 * @swagger
 * /api/inscripcion/findAll:
 *   get:
 *     summary: Obtener todas las inscripciones
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: query
 *         name: id_curso
 *         schema:
 *           type: string
 *         description: Filtro por id_curso
 *     responses:
 *       200:
 *         description: Lista de inscripciones
 *       500:
 *         description: Error al obtener inscripciones
 */

    router.get("/", curso.findAll);
    // Retrieve a single Client with id
/**
 * @swagger
 * /api/inscripcion/findOne{id}:
 *   get:
 *     summary: Obtener una inscripción por id
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción encontrada
 *       404:
 *         description: No encontrada
 */
    router.get("/:id", curso.findOne);
    // Update a Client with id
/**
 * @swagger
 * /api/inscripciones/update{id}:
 *   put:
 *     summary: Actualizar inscripción de curso
 *     tags: [Inscripciones]
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
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inscripción actualizada correctamente
 *       400:
 *         description: No se enviaron campos para actualizar
 *       404:
 *         description: No se encontró la inscripción
 */
    router.put("/update/:id", curso.update);
    // Delete a Client with id df
/**
 * @swagger
 * /api/inscripciones/delete{id}:
 *   delete:
 *     summary: Eliminar una inscripción por id
 *     tags: [Inscripciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscripción eliminada correctamente
 *       404:
 *         description: No encontrada
 */

    router.delete("/delete/:id", curso.delete);
    // Delete all Cliente
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/inscripcion", router);
};