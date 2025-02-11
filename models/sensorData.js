const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  temperatura: { type: Number, required: true },
  nivel_humo: { type: Number, required: true },
  alarma_activada: { type: Boolean, required: true },
  fecha: { type: Date, default: Date.now }
}, { collection: "historico_sensores" });

module.exports = mongoose.model("SensorData", SensorDataSchema);
