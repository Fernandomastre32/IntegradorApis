const mongoose = require("mongoose");

const ComponenteSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
  nombre: { type: String, required: true, unique: true },
  estado: Boolean,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Componentes", ComponenteSchema);


