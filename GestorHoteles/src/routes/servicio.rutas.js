'use strict'
var express = require('express');
var servicioControlador = require('../controller/servicio.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/agregarServicio', md_autorization.ensureAuth, servicioControlador.agregarServicio)

module.exports = api