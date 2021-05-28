'use strict'

var Reservacion = require('../model/reservacion.model');
var Usuario = require('../model/usuarios.model');
var Habitacion = require('../model/habitaciones.model');
var Hotel = require('../model/hotel.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function hacerReservacion(req, res) {
    var reservacionModel = new Reservacion();
    var params = req.body;

    if (params.fechaEntrada && params.fechaSalida) {
        reservacionModel.usuario = params.usuario;
        reservacionModel.hotel = params.hotel
        reservacionModel.fechaEntrada = params.fechaEntrada;
        reservacionModel.fechaSalida = params.fechaSalida;
        reservacionModel.habitacion = params.habitacion;

        Habitacion.findOne({ nombreHabitacion: reservacionModel.habitacion }).exec((err, HabitacionEncontrada) => {
            if (err) return res.status(500).send({ mensaje: 'Habitacion no encontrada' });
            if (!HabitacionEncontrada) {
                reservacionModel.save((err, reservacionGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                    if (reservacionGuardada) {
                        return res.status(200).send({ reservacionGuardada });


                    } else {
                        res.status(500).send({ mensaje: 'No se pudo hacer Reservacion' })
                    }
                });
            } else {
                return res.status(500).send({ mensaje: 'esta habitacion ya esta reservada' })
            }
        });
    } else {
        return res.status(500).send({ mensaje: 'No  deje espacios en blanco' });
    }
}

function obtenerReservacion(req, res) {
    if (req.user.rol == "ROL_ADMIN_HOTEL") {
        Reservacion.find().exec((err, reservacion) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Reservacion' })
            if (!reservacion) return res.status(500).send({ mensaje: 'Error en la consulta de Reservacion o no tiene datos' })
            return res.status(200).send({ reservacion })
        })
    }
}

module.exports = {
    hacerReservacion,
    obtenerReservacion
}