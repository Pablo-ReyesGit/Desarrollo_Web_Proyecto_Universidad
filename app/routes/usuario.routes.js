module.exports = app => {
  const Verificador = require("../middlewares/autorizacion.middleware.js");
  const soloadmin = Verificador(["admin"]);

  const usuario = require("../controllers/usuario.controller.js");
  var router = require("express").Router();

  // Crear Usuario
  /**
   * @swagger
   * /api/usuario/register/:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Usuario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - correo
   *               - contrasena
   *             properties:
   *                correo:
   *                  type: string
   *                  example: user@test.com
   *                contrasena:
   *                  type: string
   *                  example: 123456
   *                role:
   *                  type: string
   *                  example: user
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
   *       400:
   *         description: Error en la petición
   *       500:
   *         description: Error en el servidor
   */
  router.post("/register/", usuario.create);

  // Login de Usuario
  /**
   * @swagger
   * /api/usuario/login:
   *   post:
   *     summary: Login de usuario
   *     tags: [Usuario]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - correo
   *               - contrasena
   *             properties:
   *                correo:
   *                  type: string
   *                  example: user@test.com
   *                contrasena:
   *                  type: string
   *                  example: 123456
   *     responses:
   *       200:
   *         description: Login exitoso y retorno de token
   *       401:
   *         description: Contraseña incorrecta
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error en el servidor
   */
  router.post("/login", usuario.findOne);

  // Obtener todos los usuarios (solo admin)
  /**
   * @swagger
   * /api/usuario/:
   *   get:
   *     summary: Obtener todos los usuarios (requiere rol admin)
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Lista de usuarios
   *       403:
   *         description: No autorizado
   *       500:
   *         description: Error en el servidor
   */
  router.get("/", soloadmin, usuario.findAll);

  // Obtener usuarios activos
  /**
   * @swagger
   * /api/usuario/status:
   *   get:
   *     summary: Obtener todos los usuarios activos (requiere rol admin)
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Lista de usuarios activos
   *       403:
   *         description: No autorizado
   *       500:
   *         description: Error en el servidor
   */
  router.get("/status", soloadmin, usuario.findAllStatus);

  // Actualizar Usuario
  /**
   * @swagger
   * /api/usuario/update/{id}:
   *   put:
   *     summary: Actualizar datos de un usuario
   *     tags: [Usuario]
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
   *               correo:
   *                 type: string
   *               role:
   *                 type: string
   *               status:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Usuario actualizado
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error en el servidor
   */
  router.put("/update/:id", soloadmin, usuario.update);

  // Eliminar Usuario
  /**
   * @swagger
   * /api/usuario/delete/{id}:
   *   delete:
   *     summary: Eliminar un usuario
   *     tags: [Usuario]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Usuario eliminado
   *       404:
   *         description: Usuario no encontrado
   *       500:
   *         description: Error en el servidor
   */
  router.delete("/delete/:id", Verificador(["admin"]), usuario.delete);

  // Eliminar todos los usuarios
  /**
   * @swagger
   * /api/usuario/delete/:
   *   delete:
   *     summary: Eliminar todos los usuarios
   *     tags: [Usuario]
   *     responses:
   *       200:
   *         description: Todos los usuarios eliminados
   *       500:
   *         description: Error en el servidor
   */

  app.use("/api/usuario", router);
};
