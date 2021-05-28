'use strict'

var Habitacion = require('../model/habitaciones.model');
var Hotel = require('../model/hotel.model')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')

function crearHabitacion(req, res) {
    var habitacionModel = new Habitacion();
    var params = req.body;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        habitacionModel.nombreHabitacion = params.nombreHabitacion;
        habitacionModel.precio = params.precio;
        habitacionModel.disponibilidad = 'si';
        habitacionModel.hotel = params.hotel;

        if (params.nombreHabitacion && params.precio) {
            Hotel.findOne({ _id: habitacionModel.hotel }).exec((err, HotelEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Hotel no encontrado' });
                if (req.user.rol == 'ROL_ADMIN_HOTEL' && HotelEncontrado) {

                    Habitacion.findOne({ nombreHabitacion: habitacionModel.nombreHabitacion }).exec((err, HabitacionEncontrada) => {
                        if (err) return res.status(500).send({ mensaje: 'Habitacion no encontrada' });
                        if (!HabitacionEncontrada) {
                            habitacionModel.save((err, habitacionGuardado) => {
                                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                                if (habitacionGuardado) {
                                    return res.status(200).send({ habitacionGuardado });
                                } else {
                                    res.status(500).send({ mensaje: 'No se pudo guardar Hotel' })
                                }
                            });
                        } else {
                            return res.status(500).send({ mensaje: 'esta habitacion ya existe' })
                        }
                    });
                } else {
                    return res.status(500).send({ mensaje: 'No debe de dejar espacios en blanco porfa' });
                }
            })
        }
    }
}

function habitacionesDisponibles(req, res) {
    Habitacion.find({ disponibilidad: 'si' }).exec((err, disponible) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' })
        if (!disponible) return res.status(500).send({ mensaje: 'Error en la consulta de Usuarios o no tiene datos' })
        return res.status(200).send({ disponible })
    })
}

module.exports = {
    crearHabitacion,
    habitacionesDisponibles
}