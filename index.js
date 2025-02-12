require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const sensorRoutes = require("./routes/sensorRoutes"); 
const componentesRoutes = require("./routes/componentsRoutes");

const app = express();
app.use(express.json());

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(error => console.log("❌ Error al conectar MongoDB", error));

// Rutas
app.use("/api/sensores", sensorRoutes);
app.use("/api/componentes", componentesRoutes);

// Servidor en puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
