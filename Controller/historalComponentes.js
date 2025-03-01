const express = require("express");
const router = express.Router();
const ComponentData = require("../models/componentData");

router.get("/", async (_req, res) => {
    try {
        const historial = await ComponentData.find().populate("componenteId");

        // Validar si no hay datos en la base de datos
        if (!historial.length) {
            return res.status(404).json({ mensaje: "No hay historial de componentes" });
        }

        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historial de componentes", error });
    }
});

module.exports = router;