// routes/configRoutes.js
const express = require('express');
const router = express.Router();
const { getConfig, updateConfig } = require('../Controller/configController'); // Asegúrate de que la ruta sea correcta y Controller esté en minúsculas

/**
 * @swagger
 * tags:
 *   name: Configuracion
 *   description: API para gestionar la configuración de la aplicación
 */

// Obtener configuración actual
/**
 * @swagger
 * /api/configuracion:
 *   get:
 *     description: Obtener la configuración actual de la aplicación
 *     tags: [Configuracion]
 *     responses:
 *       200:
 *         description: Configuración actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mongoUri:
 *                   type: string
 *                 port:
 *                   type: integer
 */
router.get('/', getConfig);

// Actualizar configuración
/**
 * @swagger
 * /api/configuracion:
 *   post:
 *     description: Actualizar la configuración de la aplicación
 *     tags: [Configuracion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mongoUri:
 *                 type: string
 *               port:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Configuración actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Configuración actualizada"
 */
router.post('/', updateConfig);

module.exports = router;
