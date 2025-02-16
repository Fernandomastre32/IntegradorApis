/**
 * @swagger
 * tags:
 *   - name: Componentes
 *     description: Rutas para manejar componentes.
 */

/**
 * @swagger
 * /componentes:
 *   get:
 *     summary: Obtener todos los componentes
 *     tags: [Componentes]
 *     responses:
 *       200:
 *         description: Lista de componentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   descripcion:
 *                     type: string
 */
