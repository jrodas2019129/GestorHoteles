'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var servicioSchema = Schema({
    nombre: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' }
})

module.exports = moongose.model('servicios', servicioSchema);