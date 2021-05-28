'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var habitacionesSchema = Schema({
    nombreHabitacion: String,
    precio: String,
    disponibilidad: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' }
})

module.exports = moongose.model('habitaciones', habitacionesSchema);