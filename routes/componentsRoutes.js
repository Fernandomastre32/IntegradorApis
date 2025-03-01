/**
 * @swagger
 * tags:
 *   - name: Componentes
 *     description: Rutas para gestionar componentes
 */

/**
 * @swagger
 * /api/componentes:
 *   get:
 *     summary: Obtener todos los componentes
 *     tags: [Componentes]
 *     responses:
 *       200:
 *         description: Lista de componentes obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sensorId:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   estado:
 *                     type: boolean
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/componentes/{nombre}:
 *   get:
 *     summary: Obtener un componente por nombre
 *     tags: [Componentes]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Componente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sensorId:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 estado:
 *                   type: boolean
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Componente no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/componentes:
 *   post:
 *     summary: Crear o actualizar un componente
 *     tags: [Componentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               estado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Componente actualizado correctamente
 *       201:
 *         description: Componente creado correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/componentes/historial:
 *   get:
 *     summary: Obtener el historial de cambios de los componentes
 *     tags: [Componentes]
 *     responses:
 *       200:
 *         description: Historial de cambios obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   componenteId:
 *                     type: string
 *                   estado:
 *                     type: boolean
 *                   fecha:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error en el servidor
 */
