const express = require('express');
const router = express.Router();
const SensorData = require('../models/sensorData');

// Ruta para obtener los datos de los sensores
router.get('/', async (req, res) => {
  try {
    const data = await SensorData.find().sort({ fecha: -1 }).limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para guardar datos de sensores
router.post('/', async (req, res) => {
  try {
    const { temperatura, luz } = req.body;
    const newSensorData = new SensorData({ temperatura, luz });
    const savedData = await newSensorData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
