'use strict'
var express = require('express');
var reservacionControlador = require('../controller/reservacion.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/hacerReservacion', reservacionControlador.hacerReservacion);
api.get('/obtenerReservacion', md_autorization.ensureAuth, reservacionControlador.obtenerReservacion)

module.exports = api;