
/**
 * @swagger
 * /api/historial:
 *   get:
 *     summary: Obtener historial de cambios de sensores
 *     tags: [Historial]
 *     responses:
 *       200:
 *         description: Lista del historial
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sensorId:
 *                     type: string
 *                   temperatura:
 *                     type: number
 *                   nivel_humo:
 *                     type: number
 *                   alarma_activada:
 *                     type: boolean
 *                   fecha:
 *                     type: string
 *                     format: date-time
 */
