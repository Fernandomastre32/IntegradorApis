const express = require("express");
const router = express.Router();
const Componente = require("../models/components");
const ComponentData = require("../models/componentData");

// Actualizar estado del componente y guardar historial
router.put("/:sensorId/:nombre", async (req, res) => {
  try {
    const { sensorId, nombre } = req.params;
    const { estado } = req.body;

    let componente = await Componente.findOne({ sensorId, nombre });

    if (!componente) return res.status(404).json({ mensaje: "Componente no encontrado" });

    // Guardar el estado actual en la tabla historial antes de actualizar
    const historial = new ComponentData({
      componenteId: componente._id,
      estado: componente.estado, // Guardar el estado anterior
      timestamp: new Date() // Registrar el momento de la actualización
    });
    await historial.save();

    // Actualizar el componente con el nuevo estado
    componente.estado = estado;
    componente.timestamp = new Date();
    await componente.save();

    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar componente", error });
  }
});


// Crear un nuevo componente
router.post("/nuevo", async (req, res) => {
  try {
    const { sensorId, nombre, estado } = req.body;

    let componente = new Componente({ sensorId, nombre, estado });
    await componente.save();

    res.status(201).json(componente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los componentes
router.get("/", async (req, res) => {
  try {
    const componentes = await Componente.find();
    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes", error });
  }
});

// Obtener componentes por sensorId
router.get("/:sensorId", async (req, res) => {
  try {
    const { sensorId } = req.params;
    const componentes = await Componente.find({ sensorId });

    if (!componentes.length) return res.status(404).json({ mensaje: "No hay componentes para este sensor" });

    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes", error });
  }
});

module.exports = router;
