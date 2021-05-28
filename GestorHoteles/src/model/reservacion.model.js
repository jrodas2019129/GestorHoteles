'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var ReservacionSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' },
    fechaEntrada: String,
    fechaSalida: String,
    habitacion: { type: Schema.Types.ObjectId, ref: 'habitaciones' }
})

module.exports = moongose.model('reservaciones', ReservacionSchema);