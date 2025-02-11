const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  _id: { type: String, default: "unico" }, // Solo un registro
  temperatura: { type: Number, required: true },
  nivel_humo: { type: Number, required: true },
  alarma_activada: { type: Boolean, required: true },
  led_encendido: { type: Boolean, required: true },
  buzzer_activado: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: "sensores" });

module.exports = mongoose.model("Sensor", SensorSchema);
