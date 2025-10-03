module.exports = app => {
    const administrador = require("../controllers/administrador.controller.js");
    var router = require("express").Router();
    // Create a new Administrador 
/**
 * @swagger
 * /api/administrador/create/:
 *   post:
 *     summary: Crea un nuevo administrador 
 *     description: Inserta un nuevo administrador en la base de datos.
 *     tags:
 *       - Administrador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Lois"
 *               apellido:
 *                 type: string
 *                 example: "Gomez"
 *               telefono:
 *                 type: string
 *                 example: "12345678"
 *               direccion:
 *                 type: string
 *                 example: "Ciudad Celestia"
 *     responses:
 *       200:
 *         description: administrador creado exitosamente
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error en el servidor
 */
router.post("/create/", administrador.create);


   // Retrieve all Administrador
/**
 * @swagger
 * /api/administrador:
 *   get:
 *     summary: Obtiene todos los Administradores
 *     description: Retorna la lista de Administradores, opcionalmente filtrados por id_Admin.
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: query
 *         name: id_Admin
 *         schema:
 *           type: string
 *         required: false
 *         description: ID de administrador por filtrar
 *     responses:
 *       200:
 *         description: Lista de Administradores
 *       500:
 *         description: Error al obtener los administradores
 */
    router.get("/", administrador.findAll);
     // Retrieve all published Administrador
   

    //router.get("/status", administrador.findAllStatus);


    // Retrieve a single Administrador with id
/**
 * @swagger
 * /api/administrador/{id_Admin}:
 *   get:
 *     summary: Obtiene un Administrador por id_Admin
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: path
 *         name: id_Admin
 *         required: true
 *         schema:
 *           type: integer
 *         description: id_Admin de administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error en el servidor
 */
    router.get("/:id_admin", administrador.findOne);
 

// Update a Administrador with id
/**
 * @swagger
 * /api/administrador/update/{id_Admin}:
 *   put:
 *     summary: Actualiza Administrador por id_Admin
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: path
 *         name: id_Admin
 *         required: true
 *         schema:
 *           type: integer
 *         description: id_Admin del admnistrador 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Ema"
 *               apellido:
 *                 type: string
 *                 example: "Lopez"
 *               telefono:
 *                 type: string
 *                 example: "45678903"
 *               direccion:
 *                 type: string
 *                 example: "Ciudad Quetzal"
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error al actualizar
 */
    router.put("/update/:id_admin", administrador.update);


    // Delete a Administrador with id
/**
 * @swagger
 * /api/administrador/delete/{id_Admin}:
 *   delete:
 *     summary: Elimina un administrador por ID
 *     tags:
 *       - Administrador
 *     parameters:
 *       - in: path
 *         name: id_Admin
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del Administrador
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 *       500:
 *         description: Error al eliminar
 */
    router.delete("/delete/:id_admin", administrador.delete);

    // Delete all Administrador
/**
 * @swagger
 * /api/administrador/delete:
 *   delete:
 *     summary: Elimina todos los Administradores
 *     tags:
 *       - Administrador
 *     responses:
 *       200:
 *         description: Todos los administradores fueron eliminados
 *       500:
 *         description: Error en el servidor
 */
    router.delete("/delete/", administrador.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/administrador", router);
};

