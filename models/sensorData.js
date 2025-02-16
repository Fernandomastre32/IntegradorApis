const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  temperatura: Number,
  nivel_humo: Number,
  alarma_activada: Boolean,
  fecha: { type: Date, default: Date.now } // Mantener el historial con timestamps precisos
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
