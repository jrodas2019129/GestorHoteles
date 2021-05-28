'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var eventoSchema = Schema({
    tipoEvento: String,
    fecha: String,
    hora: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'hoteles' },
})

module.exports = moongose.model('eventos', eventoSchema);