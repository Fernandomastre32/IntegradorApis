const express = require("express");
const router = express.Router();
const Componente = require("../models/components");
const ComponentData = require("../models/componentData");

/**
 * @swagger
 * tags:
 *   - name: Componentes
 *     description: Rutas para gestionar componentes
 */

// Obtener todos los componentes
router.get("/", async (req, res) => {
    try {
        const componentes = await Componente.find();
        res.status(200).json(componentes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener componentes", error });
    }
});

// Obtener un componente por nombre
router.get("/:nombre", async (req, res) => {
    try {
        const { nombre } = req.params;
        const componente = await Componente.findOne({ nombre });
        if (!componente) return res.status(404).json({ mensaje: "Componente no encontrado" });
        res.status(200).json(componente);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener componente", error });
    }
});

// Crear o actualizar un componente
router.post("/", async (req, res) => {
    try {
        const { nombre, estado } = req.body;
        let componente = await Componente.findOne({ nombre });

        if (componente) {
            const historial = new ComponentData({
                componenteId: componente.sensorId,
                estado: componente.estado,
                fecha: new Date(),
            });
            await historial.save();

            componente.estado = estado === "true" || estado === true;
            componente.timestamp = new Date();
            await componente.save();

            return res.status(200).json({ mensaje: "Componente actualizado", componente });
        }

        componente = new Componente({
            nombre,
            estado: estado === "true" || estado === true,
        });

        await componente.save();
        res.status(201).json({ mensaje: "Componente creado", componente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener historial de cambios
router.get("/historial", async (req, res) => {
    try {
        const historial = await ComponentData.find().populate("componenteId");
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historial", error });
    }
});

module.exports = router;
