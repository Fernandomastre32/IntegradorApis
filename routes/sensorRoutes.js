const express = require("express");
const router = express.Router();
const Componente = require("../models/components");
const Sensor = require("../models/sensor");

// Obtener todos los componentes de un sensor
router.get("/:sensorId", async (req, res) => {
  try {
    const { sensorId } = req.params;
    const componentes = await Componente.find({ sensorId });

    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes", error });
  }
});

// Obtener un componente específico por nombre
router.get("/:sensorId/:nombre", async (req, res) => {
  try {
    const { sensorId, nombre } = req.params;
    const componente = await Componente.findOne({ sensorId, nombre });

    if (!componente) {
      return res.status(404).json({ mensaje: "Componente no encontrado" });
    }

    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el componente", error });
  }
});

// Crear o actualizar un componente
router.post("/", async (req, res) => {
  try {
    const { sensorId, nombre, estado } = req.body;

    let componente = await Componente.findOneAndUpdate(
      { sensorId, nombre },
      { estado, timestamp: new Date() },
      { new: true, upsert: true }
    );

    res.status(201).json(componente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
