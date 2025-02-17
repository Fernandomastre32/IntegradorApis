const mongoose = require("mongoose");

const ComponentDataSchema = new mongoose.Schema({
  componenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Componente", required: true }, // ✅ Aquí está corregido
  estado: Boolean,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ComponentData", ComponentDataSchema);
