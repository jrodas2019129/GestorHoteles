'use strict'
var express = require('express');
var eventoControlador = require('../controller/evento.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/crearEventos', md_autorization.ensureAuth, eventoControlador.crearEventos);
api.get('/obtenerEventos', eventoControlador.obtenerEventos);
api.get('/buscarEventoHotel/:id', md_autorization.ensureAuth, eventoControlador.buscarEventoHotel);

module.exports = api;