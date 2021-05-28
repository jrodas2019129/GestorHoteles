'use strict'
var express = require('express');
var hotelControlador = require('../controller/hotel.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/registrarHotel', md_autorization.ensureAuth, hotelControlador.registrarHotel);
api.get('/obtenerHotel/:id', hotelControlador.obtenerHotel);
api.delete('/eliminarHotel/:id', md_autorization.ensureAuth, hotelControlador.eliminarHotel);
api.put('/editarHotel/:id', md_autorization.ensureAuth, hotelControlador.editarHotel);

module.exports = api;