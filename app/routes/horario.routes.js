module.exports = app => {
    const horario = require("../controllers/horario.controller.js");
    var router = require("express").Router();

    /**
 * @swagger
 * /api/estudianteCarrera:
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
 *             required:
 *               - carnet_estudiante
 *               - nombre_carrera
 *               - fecha_ingreso
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
    router.post("/create", horario.create);

    /**
 * @swagger
 * /api/estudianteCarrera:
 *   get:
 *     summary: Listar todos los registros estudiante-carrera
 *     description: Obtiene todos los registros con los datos del estudiante y la carrera relacionados.
 *     tags: [EstudianteCarrera]
 *     responses:
 *       200:
 *         description: Lista de registros obtenida correctamente
 *       500:
 *         description: Error en el servidor
 */
    router.get("/", horario.findAll);

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
 *         description: No se encontró el registro
 */
    router.get("/:id", horario.findOne);

/**
 * @swagger
 * /api/estudianteCarrera/{id}:
 *   put:
 *     summary: Actualizar un registro estudiante-carrera
 *     tags: [EstudianteCarrera]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del registro a actualizar
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
 *         description: Datos inválidos o no enviados
 *       404:
 *         description: Registro no encontrado
 */
    router.put("/update/:id", horario.update);

    /**
 * @swagger
 * /api/estudianteCarrera/{id}:
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
 *         description: Registro no encontrado
 */
    router.delete("/delete/:id", horario.delete);

    app.use("/api/horario", router);
};
