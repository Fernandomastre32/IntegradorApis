/**
 * @swagger
 * /api/componentes/historial:
 *   get:
 *     summary: Obtener historial de cambios de componentes
 *     tags: [Historial de Componentes]
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
 *                   componenteId:
 *                     type: string
 *                   estado:
 *                     type: boolean
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 */
