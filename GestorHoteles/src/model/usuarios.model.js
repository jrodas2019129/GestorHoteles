'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var UsuarioSchema = Schema({
    username: String,
    password: String,
    rol: String
})

module.exports = moongose.model('usuarios', UsuarioSchema);