const routes = require(`express`).Router();
const controllerProyecto = require(`../controllers/proyecto.controller`);
/**
 * @swagger
 * /api/proyectos:
 *   get:
 *     summary: Obtener una lista de proyectos
 *     tags: [Proyectos]
 *     responses:
 *       200:
 *         description: Lista de proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proyecto'
 */
routes.get(`/proyectos`, controllerProyecto.getProyectos);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   get:
 *     summary: Obtener un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyecto'
 *       404:
 *         description: Proyecto no encontrado
 */
routes.get(`/proyectos/:id`, controllerProyecto.getProyectoById);

/**
 * @swagger
 * /api/proyectos:
 *   post:
 *     summary: Crear un nuevo proyecto
 *     tags: [Proyectos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearProyecto'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyecto'
 */
routes.post(`/proyectos`, controllerProyecto.createProyecto);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   patch:
 *     summary: Actualizar un proyecto por ID
 *     tags: [Proyectos]
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
 *             $ref: '#/components/schemas/ActualizarProyecto'
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 */
routes.patch(`/proyectos/:id`, controllerProyecto.updateProyecto);

/**
 * @swagger
 * /api/proyectos/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por ID
 *     tags: [Proyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 */
routes.delete(`/proyectos/:id`, controllerProyecto.deleteProyecto);

module.exports = routes;