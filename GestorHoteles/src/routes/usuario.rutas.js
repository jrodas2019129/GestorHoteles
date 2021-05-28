'use strict'
var express = require('express');
var usuarioControlador = require('../controller/usuario.controlador')
var md_autorization = require('../middlewares/authenticated')

var api = express.Router();

api.post('/login', usuarioControlador.login);
api.post('/CrearAdminH', md_autorization.ensureAuth, usuarioControlador.CrearAdminH)
api.post('/registrarUsuario', usuarioControlador.registrarUsuario);
api.get('/obtenerHoteles', usuarioControlador.obtenerHoteles);
api.get('/obtenerUsuarios', usuarioControlador.obtenerUsuarios);
api.get('/obtenerUsuario/:id', usuarioControlador.obtenerUsuario)
api.get('/obtenerHabitacion', usuarioControlador.obtenerHabitacion);
api.put('/editarUsuario/:id', md_autorization.ensureAuth, usuarioControlador.editarUsuario);
api.delete('/eliminarUsuario/:id', usuarioControlador.eliminarUsuario);
api.get('/buscarUsuarioHospedado/:id', md_autorization.ensureAuth, usuarioControlador.buscarUsuarioHospedado);
api.get('/agregarVisita/:id', usuarioControlador.agregarVisita);

module.exports = api;