const express = require('express');
const cors = require('cors');
const VehiculosRouter = require('./routes/vehiculos.router.js');

const app = express();

// Leer archivo de configuracion
require('dotenv').config();

// Para poder leer json en el body
app.use(express.json()); 

// Configuración de CORS
app.use(cors());

// Agregar aquí nueva ruta para /api/vehiculos
app.use(VehiculosRouter);

// Inicio del servidor
const port = 3001;
app.listen(port, () => {
  console.log("NODE_ENV", process.env.NODE_ENV);
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;

