const express = require("express");
const router = express.Router();
const SensorData = require("../models/sensorData");

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
router.get("/", async (req, res) => {
  try {
    const historial = await SensorData.find().populate("sensorId");
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial", error });
  }
});

module.exports = router;
