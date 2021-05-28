'use strict'

var Servicio = require('../model/servicio.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function agregarServicio(req, res) {
    var servicioModelo = new Servicio();
    var params = req.body;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        if (params.nombre) {
            servicioModelo.nombre = params.nombre

            servicioModelo.save((err, servicioGuardado) => {

                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

                if (servicioGuardado) {
                    res.status(200).send({ servicioGuardado })
                } else {
                    res.status(404).send({ mensaje: 'No se pudo guardar el Servicio' })
                }
            })
        }
    }
}

module.exports = {
    agregarServicio
}