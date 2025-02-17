const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");
const SensorData = require("../models/sensorData");

/**
 * @swagger
 * tags:
 *   - name: Sensores
 *     description: Rutas para gestionar sensores
 */

/**
 * @swagger
 * /api/sensores:
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
router.get("/", async (req, res) => {
  try {
    const sensores = await Sensor.find();
    res.status(200).json(sensores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener sensores", error });
  }
});

/**
 * @swagger
 * /api/sensores/{nombre}:
 *   get:
 *     summary: Obtener sensor por nombre
 *     tags: [Sensores]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *       404:
 *         description: Sensor no encontrado
 */
router.get("/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const sensor = await Sensor.findOne({ nombre });
    if (!sensor) return res.status(404).json({ mensaje: "Sensor no encontrado" });
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener sensor", error });
  }
});

/**
 * @swagger
 * /api/sensores:
 *   post:
 *     summary: Crear o actualizar un sensor
 *     tags: [Sensores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               temperatura:
 *                 type: number
 *               nivel_humo:
 *                 type: number
 *               alarma_activada:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sensor actualizado exitosamente
 *       201:
 *         description: Sensor creado exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post("/", async (req, res) => {
  try {
    const { nombre, temperatura, nivel_humo, alarma_activada } = req.body;
    let sensor = await Sensor.findOne({ nombre });
    if (sensor) {
      const historial = new SensorData({
        sensorId: sensor._id,
        temperatura: sensor.temperatura,
        nivel_humo: sensor.nivel_humo,
        alarma_activada: sensor.alarma_activada,
        fecha: new Date()
      });
      await historial.save();
      sensor.temperatura = temperatura;
      sensor.nivel_humo = nivel_humo;
      sensor.alarma_activada = alarma_activada;
      sensor.fecha = new Date();
      await sensor.save();
      return res.status(200).json(sensor);
    }
    sensor = new Sensor({ nombre, temperatura, nivel_humo, alarma_activada });
    await sensor.save();
    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/historial:
 *   get:
 *     summary: Obtener historial de cambios de sensores
 *     tags: [Sensores]
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
router.get("/historial", async (req, res) => {
  try {
    const historial = await SensorData.find().populate("sensorId");
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener historial", error });
  }
});

module.exports = router;
