module.exports = app => {
    const estudianteCarrera = require("../controllers/estudiantecarrera.controller.js");
    var router = require("express").Router();

    /**
 * @swagger
 * /api/estudianteCarrera/create:
 *   post:
 *     summary: Crear un registro de estudiante-carrera
 *     description: Relaciona un estudiante con una carrera específica.
 *     tags: [EstudianteCarrera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carnet_estudiante:
 *                 type: string
 *                 example: "20210001"
 *               nombre_carrera:
 *                 type: string
 *                 example: "Ingeniería en Sistemas"
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-10"
 *               fecha_egreso:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-10"
 *               estado:
 *                 type: string
 *                 example: "Activo"
 *     responses:
 *       201:
 *         description: Registro creado correctamente
 *       400:
 *         description: Datos incompletos
 *       404:
 *         description: Estudiante o Carrera no encontrados
 */
    router.post("/create", estudianteCarrera.create);

    /**
 * @swagger
 * /api/estudianteCarrera:
 *   get:
 *     summary: Listar todos los registros estudiante-carrera
 *     tags: [EstudianteCarrera]
 *     responses:
 *       200:
 *         description: Lista de registros
 *       500:
 *         description: Error en el servidor
 */
    router.get("/", estudianteCarrera.findAll);

    /**
 * @swagger
 * /api/estudianteCarrera/{id}:
 *   get:
 *     summary: Buscar un registro estudiante-carrera por ID
 *     tags: [EstudianteCarrera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro estudiante-carrera
 *     responses:
 *       200:
 *         description: Registro encontrado
 *       404:
 *         description: No encontrado
 */
    router.get("/:id", estudianteCarrera.findOne);


/**
 * @swagger
 * /api/estudianteCarrera/update/{id}:
 *   put:
 *     summary: Actualizar un registro estudiante-carrera
 *     tags: [EstudianteCarrera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carnet_estudiante:
 *                 type: string
 *                 example: "20210001"
 *               nombre_carrera:
 *                 type: string
 *                 example: "Derecho"
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               fecha_egreso:
 *                 type: string
 *                 format: date
 *                 example: "2028-10-15"
 *               estado:
 *                 type: string
 *                 example: "Inactivo"
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Registro no encontrado
 */
    router.put("/update/:id", estudianteCarrera.update);

/**
 * @swagger
 * /api/estudianteCarrera/delete/{id}:
 *   delete:
 *     summary: Eliminar un registro estudiante-carrera por ID
 *     tags: [EstudianteCarrera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       404:
 *         description: No encontrado
 */
    router.delete("/delete/:id", estudianteCarrera.delete);

    app.use("/api/estudiantecarrera", router);
};
