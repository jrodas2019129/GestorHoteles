'use strict'

var ServiciosPedidos = require('../model/serviciosPedidos.model')
var Usuario = require('../model/usuarios.model')
var Servicio = require('../model/servicio.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function agregarServiciosPedidos(req, res) {
    var servicioModelo = new ServiciosPedidos();
    var params = req.body;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        if (params.usuario && params.servicio) {
            servicioModelo.usuario = params.usuario;
            servicioModelo.servicio = params.servicio;

            servicioModelo.save((err, servicioPedidoGuardado) => {

                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

                if (servicioPedidoGuardado) {
                    res.status(200).send({ servicioPedidoGuardado })
                } else {
                    res.status(404).send({ mensaje: 'No se pudo guardar el Servicio' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'No debe dejar espacios en blanco' })
        }
    } else {
        return res.status(500).send({ mensaje: 'Error en la cabecera' })
    }
}

function obtenerServiciosHotel(req, res) {

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        ServiciosPedidos.find().exec((err, servicios) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' })
            if (!servicios) return res.status(500).send({ mensaje: 'Error en la consulta de Usuarios o no tiene datos' })

            ServiciosPedidos.find({}, function(err, usuarioServicio) {
                Usuario.populate(usuarioServicio, { path: "usuario" }, function(err, usuarioServicio) {
                    res.status(200).send({ usuarioServicio });
                })
            })

            ServiciosPedidos.find({}, function(err, servicioUsuario) {
                Servicio.populate(servicioUsuario, { path: "servicio" }, function(err, servicioUsuario) {
                    //res.status(200).send({ usuarioHospedado });
                })
            })
        })
    }
}

module.exports = {
    agregarServiciosPedidos,
    obtenerServiciosHotel
}