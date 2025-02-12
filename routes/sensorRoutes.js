const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor.model");
const SensorData = require("../models/sensorData.model");

// Obtener todos los sensores
router.get("/", async (req, res) => {
  try {
    const sensores = await Sensor.find();
    res.status(200).json(sensores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener sensores", error });
  }
});

// Obtener sensor por nombre
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

// Actualizar datos del sensor sin cambiar nombre
router.put("/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const { temperatura, nivel_humo, alarma_activada } = req.body;

    let sensor = await Sensor.findOneAndUpdate(
      { nombre },
      { temperatura, nivel_humo, alarma_activada, timestamp: new Date() },
      { new: true }
    );

    if (!sensor) return res.status(404).json({ mensaje: "Sensor no encontrado" });

    // Guardar en historial
    const newData = new SensorData({ sensorId: sensor._id, temperatura, nivel_humo, alarma_activada });
    await newData.save();

    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo sensor
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
