module.exports = app => {
    const docente = require("../controllers/docente.controller.js");
    var router = require("express").Router();
    //Nuevo Docente
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
   *                nombre:
   *                  type: string
   *                fechaNacimiento:
   *                  type: string
   *                  format: date
   *                genero:
   *                  type: boolean
   *                sueldo:
   *                  type: number
   *                  format: digits
   *                id_usuario:
   *                  type: integer
   *     responses:
   *       200:
   *         description: Docente creado
   *       400:
   *         description: Error al crear Docente
   */
    router.post("/create/", docente.create);
   
    //Obtener docente por carnet
    /**
     * @swagger
     * /api/estudiante/{carnet}:
     *   get:
     *     summary: Obtener docente por carnet
     *     tags: [Docente]
     *     parameters:
     *        - in: path
     *          name: carnet
     *          type: string
     *     description: Obtener docente por carnet
     *     responses:
     *       200:
     *         description: Docente encontrado encontrado
     */
    //Obtener por id estudiante

    router.put("/asignar/:carnet", docente.asignacionCarrera);

    router.put("/desasignar/:carnet", docente.desasignacionCarrera);

    router.get("/", docente.findAll);
    // Retrieve all published Clients
    router.get("/status", docente.findAllStatus);
    // Retrieve a single Client with id
    router.get("/:id", docente.getByCarnet);
    // Update a Client with id
    router.put("/update/:id", docente.update);
    // Delete a Client with id
    router.delete("/delete/:id", docente.delete);
    // Delete all Cliente
    router.delete("/delete/", docente.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/docente", router);
};