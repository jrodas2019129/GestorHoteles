'use strict'

var Hotel = require('../model/hotel.model')
var Usuario = require('../model/usuarios.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function registrarHotel(req, res) {
    var hotelModelo = new Hotel();
    var params = req.body

    if (req.user.rol == 'ROL_ADMIN') {
        hotelModelo.nombre = params.nombre;
        hotelModelo.direccion = params.direccion
        hotelModelo.admin = params.admin

        if (params.nombre && params.direccion && params.admin) {
            Usuario.findOne({ _id: hotelModelo.admin }).exec((err, UsuarioEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Usuario no encontrado' });
                if (UsuarioEncontrado.rol == 'ROL_ADMIN_HOTEL') {

                    Hotel.find({ nombre: params.nombre }).exec((err, hotelEncontrado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion Hotel' })
                        if (hotelEncontrado.length >= 1) {
                            res.status(500).send({ mensaje: 'Hotel ya existe' });
                        } else {
                            hotelModelo.save((err, hotelGuardado) => {
                                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                                if (hotelGuardado) {
                                    return res.status(200).send({ hotelGuardado });
                                } else {
                                    res.status(500).send({ mensaje: 'No se pudo guardar Hotel' })
                                }
                            });
                        }
                    })
                } else {
                    return res.status(500).send({ mensaje: 'No debe de dejar espacios en blanco' });
                }
            })
        }
    }
}

function obtenerHotel(req, res) {
    var hotelId = req.params.id;

    Hotel.findById(hotelId, (err, HotelEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
        if (!HotelEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Usuario.' });
        return res.status(200).send({ HotelEncontrado })
    })
}

function editarHotel(req, res) {
    var HotelId = req.params.id;
    var params = req.body;

    delete params.password

    if (req.user.rol == 'ROL_ADMIN') {
        Hotel.findByIdAndUpdate(HotelId, params, { new: true }, (err, usuarioactualizado) => {
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (!usuarioactualizado) return res.status(500).send({ mensaje: "No se pudo editar el usuario" });
            return res.status(200).send({ usuarioactualizado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Solo el Admin puede editar hoteles' })
    }
}

function eliminarHotel(req, res) {
    var HotelId = req.params.id;

    if (req.user.rol == 'ROL_ADMIN') {
        Hotel.findByIdAndDelete(HotelId, function(err, hotelEliminado) {
            if (err) return res.status(500).send({ mensaje: 'Error borrando usuario' })
            if (!hotelEliminado) return res.status(500).send({ mensaje: 'No se pudo eliminar usuario porque no hay datos' })
            return res.status(200).send({ hotelEliminado })
        });
    } else {
        return res.status(500).send({ mensaje: 'Solo el admin puede eliminar hoteles' })
    }
}

module.exports = {
    registrarHotel,
    obtenerHotel,
    eliminarHotel,
    editarHotel
}