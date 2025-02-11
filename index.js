require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");

const sensorRoutes = require("./routes/sensorRoutes");
const componenteRoutes = require("./routes/componenteRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/sensores", sensorRoutes);
app.use("/api/componentes", componenteRoutes);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
