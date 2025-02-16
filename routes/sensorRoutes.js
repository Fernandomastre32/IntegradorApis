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
 *         description: Nombre del sensor que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                 temperatura:
 *                   type: number
 *                 nivel_humo:
 *                   type: number
 *                 alarma_activada:
 *                   type: boolean
 *       404:
 *         description: Sensor no encontrado
 *       500:
 *         description: Error al obtener el sensor
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
 * /api/sensores/{nombre}:
 *   put:
 *     summary: Actualizar los datos de un sensor
 *     tags: [Sensores]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         description: Nombre del sensor a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperatura:
 *                 type: number
 *               nivel_humo:
 *                 type: number
 *               alarma_activada:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Sensor actualizado exitosamente
 *       404:
 *         description: Sensor no encontrado
 *       500:
 *         description: Error al actualizar el sensor
 */
router.put("/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const { temperatura, nivel_humo, alarma_activada } = req.body;

    let sensor = await Sensor.findOne({ nombre });

    if (!sensor) return res.status(404).json({ mensaje: "Sensor no encontrado" });

    // Guardar el estado anterior en la tabla de historial antes de actualizar
    const historial = new SensorData({
      sensorId: sensor._id,
      temperatura: sensor.temperatura,
      nivel_humo: sensor.nivel_humo,
      alarma_activada: sensor.alarma_activada,
      fecha: new Date() // Registrar el momento del cambio
    });
    await historial.save();

    // Actualizar el sensor con los nuevos valores
    sensor.temperatura = temperatura;
    sensor.nivel_humo = nivel_humo;
    sensor.alarma_activada = alarma_activada;
    sensor.fecha = new Date();
    await sensor.save();

    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/sensores:
 *   post:
 *     summary: Crear un nuevo sensor
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
 *       201:
 *         description: Sensor creado exitosamente
 *       400:
 *         description: El sensor ya existe
 *       500:
 *         description: Error al crear el sensor
 */
router.post("/", async (req, res) => {
  try {
    const { nombre, temperatura, nivel_humo, alarma_activada } = req.body;

    let sensor = await Sensor.findOne({ nombre });
    if (sensor) return res.status(400).json({ mensaje: "El sensor ya existe" });

    sensor = new Sensor({ nombre, temperatura, nivel_humo, alarma_activada });
    await sensor.save();

    res.status(201).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
