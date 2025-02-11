const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }, // Nombre único del sensor
  temperatura: { type: Number, required: true },
  nivel_humo: { type: Number, required: true },
  alarma_activada: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: "sensores" });

module.exports = mongoose.model("Sensor", SensorSchema);
