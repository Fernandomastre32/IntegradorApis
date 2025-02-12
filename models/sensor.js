const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
  temperatura: Number,
  nivel_humo: Number,
  alarma_activada: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", SensorSchema);
