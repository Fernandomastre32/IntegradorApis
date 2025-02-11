const express = require("express");
const router = express.Router();
const SensorData = require("../models/sensorData");

// Ruta para obtener los últimos 10 registros históricos
router.get("/historial", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ fecha: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener el último estado del sensor
router.get("/", async (req, res) => {
  try {
    const sensor = await SensorData.findOne({ _id: "unico" });
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener datos", error });
  }
});

// Ruta para guardar datos (historial) y actualizar el estado actual
router.post("/", async (req, res) => {
  try {
    const { temperatura, luz } = req.body;

    // Guarda en historial
    const newSensorData = new SensorData({ temperatura, luz });
    await newSensorData.save();

    // Actualiza el estado actual (mantiene solo un documento)
    const updatedSensor = await SensorData.findOneAndUpdate(
      { _id: "unico" },
      { temperatura, luz, fecha: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json({ historial: newSensorData, actual: updatedSensor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const SensorData = require("../models/sensorData");

// Ruta para obtener los últimos 10 registros históricos
router.get("/historial", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ fecha: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener el último estado del sensor
router.get("/", async (req, res) => {
  try {
    const sensor = await SensorData.findOne({ _id: "unico" });
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener datos", error });
  }
});

// Ruta para guardar datos (historial) y actualizar el estado actual
router.post("/", async (req, res) => {
  try {
    const { temperatura, luz } = req.body;

    // Guarda en historial
    const newSensorData = new SensorData({ temperatura, luz });
    await newSensorData.save();

    // Actualiza el estado actual (mantiene solo un documento)
    const updatedSensor = await SensorData.findOneAndUpdate(
      { _id: "unico" },
      { temperatura, luz, fecha: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json({ historial: newSensorData, actual: updatedSensor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
