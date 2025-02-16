const express = require("express");
const router = express.Router();
const Sensor = require("../models/sensor");
const SensorData = require("../models/sensorData");

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
