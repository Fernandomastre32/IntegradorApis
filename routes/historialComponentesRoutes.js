const express = require("express");
const router = express.Router();
const ComponentData = require("../models/componentData");

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
router.get("/", async (req, res) => {
  try {
    const historial = await ComponentData.find().populate("componenteId");
    
    // Validar si no hay datos en la base de datos
    if (!historial.length) {
      return res.status(404).json({ mensaje: "No hay historial de componentes" });
    }

    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial de componentes", error });
  }
});

module.exports = router;
