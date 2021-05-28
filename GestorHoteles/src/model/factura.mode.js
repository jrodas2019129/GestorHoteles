'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var facturaSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    reservacion: { type: Schema.Types.ObjectId, ref: 'reservaciones' },
    total: String
})

module.exports = moongose.model('facturas', facturaSchema);