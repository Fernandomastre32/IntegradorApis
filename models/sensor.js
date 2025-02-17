const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true }, // Agregado el campo 'nombre'
  temperatura: Number,
  nivel_humo: Number,
  estado: Boolean,
  alarma_activada: Boolean,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", SensorSchema);
