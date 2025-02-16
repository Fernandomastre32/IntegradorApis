/**
 * @swagger
 * tags:
 *   - name: Sensores
 *     description: Rutas para manejar sensores.
 */

/**
 * @swagger
 * /sensores:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [Sensores]
 *     responses:
 *       200:
 *         description: Lista de sensores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre:
 *                     type: string
 *                   temperatura:
 *                     type: number
 *                   nivel_humo:
 *                     type: number
 *                   alarma_activada:
 *                     type: boolean
 */
