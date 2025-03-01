const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  temperatura: Number,
  nivel_humo: Number,
  alarma_activada: Boolean,
  fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model("SensorData", SensorDataSchema);
