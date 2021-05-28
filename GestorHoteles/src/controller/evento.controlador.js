'use strict'

var Evento = require('../model/evento.model')
var Hotel = require('../model/hotel.model')
var Usuario = require('../model/usuarios.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function crearEventos(req, res) {
    var eventoModel = new Evento();
    var params = req.body;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        eventoModel.tipoEvento = params.tipoEvento;
        eventoModel.fecha = params.fecha;
        eventoModel.hora = params.hora;
        eventoModel.hotel = params.hotel

        if (params.tipoEvento) {
            eventoModel.save((err, usuarioGuardado) => {

                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

                if (usuarioGuardado) {
                    res.status(200).send({ usuarioGuardado })
                } else {
                    res.status(404).send({ mensaje: 'No se pudo guardar el evento' })
                }
            })
        }
    } else {
        res.status(500).send({ mensaje: 'Error en el encabezado' })
    }
}

function obtenerEventos(req, res) {
    Evento.find().exec((err, evento) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Evento' })
        if (!evento) return res.status(500).send({ mensaje: 'Error en la consulta de Evento o no hay datos' })
        return res.status(200).send({ evento })
    })
}

function buscarEventoHotel(req, res) {
    var hotelId = req.params.id;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        Hotel.findById(hotelId, (err, eventoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
            if (!eventoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Evento.' });

            Evento.find({}, function(err, eventoHotel) {
                Hotel.populate(eventoHotel, { path: "hotel" }, function(err, eventoHotel) {
                    res.status(200).send({ eventoHotel })
                })
            })
        })
    }
}

module.exports = {
    crearEventos,
    obtenerEventos,
    buscarEventoHotel
}