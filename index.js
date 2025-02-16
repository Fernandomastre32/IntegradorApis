require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
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

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de mi Proyecto",
      version: "1.0.0",
      description: "Documentación de la API para gestionar sensores y componentes.",
    },
  },
  apis: [
    "./routes/sensorRoutes.js", // Ruta a las rutas de sensores
    "./routes/componentsRoutes.js", // Ruta a las rutas de componentes
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Servir la documentación Swagger en el endpoint '/api-docs'
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/api/sensores", sensorRoutes);
app.use("/api/componentes", componentesRoutes);

// Servidor en puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
