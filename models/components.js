const mongoose = require("mongoose");

const ComponenteSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor", required: true },
  nombre: { type: String, required: true }, // Nombre del componente (LED, Buzzer, etc.)
  estado: { type: Boolean, required: true }, // Estado del componente (encendido/apagado)
  timestamp: { type: Date, default: Date.now }
}, { collection: "componentes" });

module.exports = mongoose.model("Componente", ComponenteSchema);
