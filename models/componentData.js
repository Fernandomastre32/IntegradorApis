const mongoose = require("mongoose");

const ComponentDataSchema = new mongoose.Schema({
  componenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Componentes", required: true },
  estado: Boolean,
  timestamp: { type: Date, default: Date.now } // Asegurar que siempre se guarda la fecha y hora exacta
});

module.exports = mongoose.model("ComponentData", ComponentDataSchema);
