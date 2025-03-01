const express = require("express");
const router = express.Router();
const SensorData = require("../models/sensorData");

router.get("/", async (req, res) => {
    try {
        const historial = await SensorData.find().populate("sensorId");
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener historial", error });
    }
});

module.exports = router;
