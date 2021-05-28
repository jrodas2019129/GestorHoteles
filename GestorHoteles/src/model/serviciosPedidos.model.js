'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var servicioPedidosSchema = Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'usuarios' },
    servicio: { type: Schema.Types.ObjectId, ref: 'servicios' }
})

module.exports = moongose.model('serviciosPedidos', servicioPedidosSchema);