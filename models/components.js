const mongoose = require("mongoose");

const ComponenteSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  nombre: { type: String, required: true },
  estado: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Componente", ComponenteSchema);
