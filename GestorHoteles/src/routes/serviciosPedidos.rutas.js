'use strict'
var express = require('express');
var serviciosPedidos = require('../controller/serviciosPedidos.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/agregarServiciosPedidos', md_autorization.ensureAuth, serviciosPedidos.agregarServiciosPedidos);
api.get('/obtenerServiciosHotel', md_autorization.ensureAuth, serviciosPedidos.obtenerServiciosHotel)

module.exports = api;