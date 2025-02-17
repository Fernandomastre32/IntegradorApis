const express = require("express");
const router = express.Router();
const Componente = require("../models/components");
const ComponentData = require("../models/componentData");
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
router.get("/", async (req, res) => {
  try {
    const componentes = await Componente.find();
    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes", error });
  }
});

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
router.get("/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const componente = await Componente.findOne({ nombre });
    if (!componente) return res.status(404).json({ mensaje: "Componente no encontrado" });
    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componente", error });
  }
});

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
router.post("/", async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    let componente = await Componente.findOne({ nombre });

    if (componente) {
      // Guardar estado anterior en historial
      const historial = new ComponentData({
        componenteId: componente.sensorId,
        estado: componente.estado,
        fecha: new Date(),
      });
      await historial.save();

      // Actualizar estado y fecha
      componente.estado = estado === "true" || estado === true;
      componente.timestamp = new Date();
      await componente.save();

      return res.status(200).json({ mensaje: "Componente actualizado", componente });
    }

    // Crear nuevo componente si no existe
    componente = new Componente({
      nombre,
      estado: estado === "true" || estado === true,
    });

    await componente.save();
    res.status(201).json({ mensaje: "Componente creado", componente });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
router.get("/historial", async (req, res) => {
  try {
    const historial = await ComponentData.find().populate("componenteId");
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial", error });
  }
});

module.exports = router;
