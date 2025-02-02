const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  temperatura: { type: Number, required: true },
  luz: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
