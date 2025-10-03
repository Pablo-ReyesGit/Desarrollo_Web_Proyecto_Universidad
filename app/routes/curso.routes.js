module.exports = app => {
    const curso = require("../controllers/curso.controller.js");
    var router = require("express").Router();
    // Create a new Client
/**
 * @swagger
 * /api/curso/create:
 *   post:
 *     summary: Crea un nuevo curso
 *     description: Inserta un nuevo curso en la base de datos.
 *     tags:
 *       - Curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_materia
 *             properties:
 *               periodo:
 *                 type: string
 *                 example: "2025-1"
 *               seccion:
 *                 type: string
 *                 example: "A"
 *               cupo_maximo:
 *                 type: integer
 *                 example: 40
 *               carnet_docente:
 *                 type: string
 *                 example: "D-25-2025"
 *               nombre_materia:
 *                 type: string
 *                 example: "algebra lineal"
 *     responses:
 *       200:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error en el servidor
 */

    router.post("/create/", curso.create);
    // Retrieve all Client
/**
 * @swagger
 * /api/curso:
 *   get:
 *     summary: Obtiene todos los cursos
 *     description: Retorna la lista de cursos, opcionalmente filtrados por id_materia.
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: query
 *         name: id_materia
 *         schema:
 *           type: string
 *         required: false
 *         description: ID de la materia para filtrar
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       500:
 *         description: Error al obtener los cursos
 */
    router.get("/", curso.findAll);
    // Retrieve all published Clients
/**
 * @swagger
 * /api/curso/status:
 *   get:
 *     summary: Obtiene todos los cursos activos
 *     description: Retorna todos los cursos con status = true
 *     tags:
 *       - Curso
 *     responses:
 *       200:
 *         description: Lista de cursos activos
 *       500:
 *         description: Error en el servidor
 */
    router.get("/status", curso.findAllStatus);
    // Retrieve a single Client with id
/**
 * @swagger
 * /api/curso/{id}:
 *   get:
 *     summary: Obtiene un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error en el servidor
 */
    router.get("/:id_materia", curso.findOne);
    // Update a Client with id
/**
 * @swagger
 * /api/curso/update/{id}:
 *   put:
 *     summary: Actualiza un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               periodo:
 *                 type: string
 *                 example: "2025-2"
 *               seccion:
 *                 type: string
 *                 example: "B"
 *               cupo_maximo:
 *                 type: integer
 *                 example: 35
 *               carnet_docente:
 *                 type: string
 *                 example: "E-2025-1"
 *               nombre_materia:
 *                 type: string
 *                 example: "Algebra Lineal"
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al actualizar
 */
    router.put("/update/:id", curso.update);
    // Delete a Client with id
/**
 * @swagger
 * /api/curso/delete/{id}:
 *   delete:
 *     summary: Elimina un curso por ID
 *     tags:
 *       - Curso
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error al eliminar
 */
    router.delete("/delete/:id", curso.delete);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/curso", router);
};