const express = require("express");
const router = express.Router();
const Componente = require("../models/componente.model");

// Actualizar estado del componente sin cambiar su nombre
router.put("/:sensorId/:nombre", async (req, res) => {
  try {
    const { sensorId, nombre } = req.params;
    const { estado } = req.body;

    let componente = await Componente.findOneAndUpdate(
      { sensorId, nombre },
      { estado, timestamp: new Date() },
      { new: true }
    );

    if (!componente) return res.status(404).json({ mensaje: "Componente no encontrado" });

    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar componente", error });
  }
});

// Crear un nuevo componente
router.post("/", async (req, res) => {
  try {
    const { sensorId, nombre, estado } = req.body;

    let componente = new Componente({ sensorId, nombre, estado });
    await componente.save();

    res.status(201).json(componente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
