'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var HotelSchema = Schema({
    nombre: String,
    direccion: String,
    visitas: Number,
    admin: { type: Schema.Types.ObjectId, ref: 'usuarios' }
});

module.exports = moongose.model('hoteles', HotelSchema);