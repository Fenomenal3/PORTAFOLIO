const routes = require(`express`).Router();
const controllerUsuario=require(`../controllers/usuario.controller`);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener una lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
routes.get(`/usuarios`, controllerUsuario.getUsuarios);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un Uusario por id
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *              type: integer
 *         required: true
 *         description: ID de Usuario
 *     responses:
 *       200:
 *         description: Usuario obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
routes.get(`/usuarios/:id`,controllerUsuario.getUsuarioById);
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearUsuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
routes.post(`/usuarios`,controllerUsuario.createUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarUsuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
routes.patch(`/usuarios/:id`, controllerUsuario.updateUsuario);
/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado 
 *         content:
 *           application/json:
 *             schema:
 *              $ref:'#/components/schemas/Usuario'
 */
routes.delete(`/usuarios/:id`,controllerUsuario.deleteUsuario);


module.exports = routes;