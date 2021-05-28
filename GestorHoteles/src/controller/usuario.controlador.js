'use strict'

var Usuario = require('../model/usuarios.model')
var Hotel = require('../model/hotel.model')
var Habitacion = require('../model/habitaciones.model')
var Reservacion = require('../model/reservacion.model')
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../service/jwt");

function Admin(req, res) {
    var usuarioModelo = Usuario();
    usuarioModelo.username = 'Admin'
    usuarioModelo.rol = 'ROL_ADMIN';

    Usuario.find({
        username: 'Admin'
    }).exec((err, adminoEncontrado) => {
        if (err) return console.log({ mensaje: 'Error creando al admin' });
        if (adminoEncontrado.length >= 1) {
            return console.log('Admin preparado!!!');
        } else {
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModelo.password = passwordEncriptada;
                usuarioModelo.save((err, usuarioGuardado) => {
                    if (err) return console.log({ mensaje: 'Error guardando usuario admin' })
                    if (usuarioGuardado) {
                        console.log({ mensaje: 'Admin preparado!!!' })
                    } else {
                        console.log({ mensaje: 'Usuario Admin no esta preparado :(' });
                    }
                })
            })
        }
    })
}

function login(req, res) {
    var params = req.body;

    Usuario.findOne({ username: params.username }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error encontrando username' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en verificacion de password' });
                if (passVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        });
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'Error usuario no se pudo identificar' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: "Error buscando al Usuario" })
        }
    })
}

function CrearAdminH(req, res) {
    var usuarioModelo = new Usuario();
    var params = req.body;

    if (req.user.rol == 'ROL_ADMIN') {
        if (params.username) {
            usuarioModelo.username = params.username;
            usuarioModelo.rol = 'ROL_ADMIN_HOTEL'
            usuarioModelo.password = params.password;

            Usuario.find({ username: usuarioModelo.username }).exec((err, usuarioEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Error encontrando Usuario' });
                if (usuarioEncontrado && usuarioEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: 'Este Usuario ya existe' });
                } else {
                    bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                        usuarioModelo.password = passwordEncriptada;

                        usuarioModelo.save((err, usuarioGuardado) => {

                            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

                            if (usuarioGuardado) {
                                res.status(200).send({ usuarioGuardado })
                            } else {
                                res.status(404).send({ mensaje: 'No se pudo registrar el Usuario' })
                            }
                        })
                    })
                }
            })
        }
    }
}

function registrarUsuario(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;

    if (params.username && params.password) {
        usuarioModel.username = params.username;
        usuarioModel.rol = 'ROL_USUARIO';

        Usuario.find({ username: usuarioModel.username }).exec((err, usuariosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'Este Usuario ya existe' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

                        if (usuarioGuardado) {
                            res.status(200).send({ usuarioGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se pudo registrar el Usuario' })
                        }
                    })
                })
            }
        })
    } else {
        res.status(404).send({ mensaje: 'No se pudo registrar el Usuario' })
    }
}

function obtenerHoteles(req, res) {
    Hotel.find().exec((err, hoteles) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Hoteles' });
        if (!hoteles) return res.status(500).send({ mensaje: 'Error en la consulta de Hoteles o no tiene datos' })
        return res.status(200).send({ hoteles })
    })
}

function obtenerHabitacion(req, res) {
    Habitacion.find().exec((err, habitacion) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Habitacion' });
        if (!habitacion) return res.status(500).send({ mensaje: 'Error en la consulta de Habitacion o no tiene datos' })
        return res.status(200).send({ habitacion })
    })
}

function editarUsuario(req, res) {
    var idUsuario = req.params.id;
    var params = req.body;

    delete params.password

    if (idUsuario != req.user.sub) {
        return res.status(500).send({ mensaje: "No se puede editar otro usuario " });
    }
    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioactualizado) => {
        if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
        if (!usuarioactualizado) return res.status(500).send({ mensaje: "No se pudo editar el usuario" });
        return res.status(200).send({ usuarioactualizado });
    })
}

function eliminarUsuario(req, res) {
    var UsuarioId = req.params.id;

    Usuario.findByIdAndDelete(UsuarioId, function(err, usuarioEliminado) {
        if (err) return res.status(500).send({ mensaje: 'Error borrando usuario' })
        if (!usuarioEliminado) return res.status(500).send({ mensaje: 'No se pudo eliminar usuario porque no hay datos' })
        return res.status(200).send({ usuarioEliminado })
    });
}

function obtenerUsuarios(req, res) {
    Usuario.find().exec((err, usuario) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' })
        if (!usuario) return res.status(500).send({ mensaje: 'Error en la consulta de Usuarios o no tiene datos' })
        return res.status(200).send({ usuario })
    })
}

function buscarUsuarioHospedado(req, res) {
    var usuarioId = req.params.id;

    if (req.user.rol == 'ROL_ADMIN_HOTEL') {
        Usuario.findById(usuarioId, (err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
            if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Usuario.' });

            Reservacion.find({}, function(err, usuarioHospedado) {
                Usuario.populate(usuarioHospedado, { path: "usuario" }, function(err, usuarioHospedado) {
                    res.status(200).send({ usuarioHospedado })
                })
            })
        })
    }
}

function obtenerUsuario(req, res) {
    var usuarioId = req.params.id;

    Usuario.findById(usuarioId, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Usuario.' });
        return res.status(200).send({ usuarioEncontrado })
    })
}

function agregarVisita(req, res) {
    var hotelId = req.params.id;
    var dataUpdate = {};

    Hotel.findById(hotelId, (err, hotel) => {
        if (!err) {
            dataUpdate['visitas'] = hotel.visitas + 1;
            Hotel.findOneAndUpdate({ _id: hotelId }, dataUpdate, { new: true }, (err, hotelA) => {
                if (!err) {
                    res.status(200).send(hotelA);
                } else {
                    res.status(500).send({ mensaje: 'error' })
                }
            })
        } else {
            res.status(500).send({ mensaje: 'error' })
        }
    });
}

module.exports = {
    Admin,
    login,
    CrearAdminH,
    registrarUsuario,
    obtenerHoteles,
    obtenerHabitacion,
    obtenerUsuarios,
    obtenerUsuario,
    editarUsuario,
    eliminarUsuario,
    buscarUsuarioHospedado,
    agregarVisita
}