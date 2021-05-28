'use strict'

// VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')

// IMPORTACION DE RUTAS
var usuario_rutas = require('./src/routes/usuario.rutas');
var hotel_rutas = require('./src/routes/hotel.rutas')
var habitacion_rutas = require('./src/routes/habitacion.rutas')
var reservaciones_rutas = require('./src/routes/reservacion.rutas')
var evento_rutas = require('./src/routes/evento.rutas')
var servicio_rutas = require('./src/routes/servicio.rutas')
var serviciosPedidos_rutas = require('./src/routes/serviciosPedidos.rutas')

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CABECERAS
app.use(cors());

// APLICACION DE RUTAS
app.use('/api', usuario_rutas, hotel_rutas, habitacion_rutas, reservaciones_rutas, evento_rutas, servicio_rutas, serviciosPedidos_rutas);


// EXPORTAR
module.exports = app;