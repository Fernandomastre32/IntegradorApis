// models/configModel.js
const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    mongoUri: { type: String, required: true },
    port: { type: Number, required: true }
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
