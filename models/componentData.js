const mongoose = require("mongoose");

const ComponentDataSchema = new mongoose.Schema({
  componenteId: { type: mongoose.Schema.Types.ObjectId, ref: "Componentes", required: true },
  estado: Boolean,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ComponentData", ComponentDataSchema);
