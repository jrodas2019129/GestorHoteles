'use strict'
var express = require('express');
var habitacionControlador = require('../controller/habitacion.controlador')
var md_autorization = require('../middlewares/authenticated');

var api = express.Router();

api.post('/crearHabitacion', md_autorization.ensureAuth, habitacionControlador.crearHabitacion);
api.get('/habitacionesDisponibles', habitacionControlador.habitacionesDisponibles);

module.exports = api;