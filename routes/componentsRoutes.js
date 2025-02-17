const express = require("express");
const router = express.Router();
const Componente = require("../models/components");
const ComponentData = require("../models/componentData");
const Sensor = require("../models/sensor"); // 🔹 Asegurar importación

/**
 * @swagger
 * /api/componentes/{sensorId}/{nombre}:
 *   put:
 *     summary: Actualizar el estado de un componente y guardar historial
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor asociado al componente
 *       - in: path
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del componente
 *       - in: body
 *         name: estado
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             estado:
 *               type: string
 *         description: Estado actualizado del componente
 *     responses:
 *       200:
 *         description: Componente actualizado con éxito
 *       404:
 *         description: Componente no encontrado
 *       500:
 *         description: Error al actualizar el componente
 */
router.put("/:sensorId/:nombre", async (req, res) => {
  try {
    const { sensorId, nombre } = req.params;
    const { estado } = req.body;

    let componente = await Componente.findOne({ sensorId, nombre });

    if (!componente) {
      return res.status(404).json({ mensaje: "Componente no encontrado" });
    }

    // Guardar estado actual en historial
    const historial = new ComponentData({
      componenteId: componente._id,
      estado: componente.estado,
      timestamp: new Date(),
    });
    await historial.save();

    // Actualizar el componente
    componente.estado = estado;
    componente.timestamp = new Date();
    await componente.save();

    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar componente", error });
  }
});
/**
 * @swagger
 * /api/componentes/nuevo:
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
 *                 type: string
 *     responses:
 *       201:
 *         description: Componente creado con éxito
 *       200:
 *         description: Componente actualizado con éxito
 *       500:
 *         description: Error en el servidor
 */
router.post("/nuevo", async (req, res) => {
  try {
    const { nombre, estado } = req.body;

    let componente = await Componente.findOne({ nombre });

    if (componente) {
      componente.estado = estado;
      componente.timestamp = new Date();
      await componente.save();
      return res.status(200).json({ mensaje: "Componente actualizado", componente });
    }

    // 🔹 Se crea primero el sensor, asegurando que sea válido antes de continuar
    const nuevoSensor = new Sensor({ nombre: `Sensor ${Date.now()}` });
    const sensorGuardado = await nuevoSensor.save(); // 🔹 Guardar el sensor y obtener el ID

    if (!sensorGuardado || !sensorGuardado._id) {
      return res.status(500).json({ mensaje: "Error al crear el sensor" });
    }

    // 🔹 Ahora se crea el componente con el sensor correctamente asignado
    componente = new Componente({
      sensorId: sensorGuardado._id, // 🔹 Ahora sensorId se asigna correctamente
      nombre,
      estado,
    });

    await componente.save();

    res.status(201).json({ mensaje: "Componente creado", componente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/componentes:
 *   get:
 *     summary: Obtener todos los componentes
 *     tags: [Componentes]
 *     responses:
 *       200:
 *         description: Lista de componentes obtenida con éxito
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
 * /api/componentes/{sensorId}:
 *   get:
 *     summary: Obtener componentes por sensorId
 *     tags: [Componentes]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del sensor
 *     responses:
 *       200:
 *         description: Lista de componentes obtenida con éxito
 *       404:
 *         description: No hay componentes para este sensor
 *       500:
 *         description: Error en el servidor
 */
router.get("/:sensorId", async (req, res) => {
  try {
    const { sensorId } = req.params;
    const componentes = await Componente.find({ sensorId });

    if (!componentes.length) {
      return res.status(404).json({ mensaje: "No hay componentes para este sensor" });
    }

    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener componentes", error });
  }
});

module.exports = router;
