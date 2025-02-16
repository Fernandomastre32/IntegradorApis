require('dotenv').config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  authSource: "mi_base_de_datos", // Asegura que se autentique en la base correcta
  user: "admin",  // Usuario de MongoDB
  pass: "adminpassword" // Contraseña de MongoDB
})
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));
