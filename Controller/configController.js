// controllers/configController.js
const Config = require('../models/configModel');

// Obtener configuración actual
const getConfig = async (req, res) => {
    try {
        const config = {
            mongoUri: process.env.MONGO_URI,
            port: process.env.PORT || 5000,
        };
        res.json(config);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Actualizar configuración
const updateConfig = async (req, res) => {
    try {
        const { mongoUri, port } = req.body;

        // Aquí podrías validar y luego actualizar las configuraciones si es necesario
        if (mongoUri) {
            process.env.MONGO_URI = mongoUri;
        }
        if (port) {
            process.env.PORT = port;
        }

        res.json({ message: 'Configuración actualizada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getConfig, updateConfig };
