'use strict'

const { Schema, model } = require('mongoose'); //constantes para crear modelo

const BitacoraSchema = Schema({

    id_quimico: { type: Schema.Types.ObjectId, ref: 'Quimico', requiered: true },
    f_uso: { type: Date, requiered: true },
    expirado: { type: Boolean, default: false },
    id_usuario_entrego: { type: Schema.Types.ObjectId, ref: 'Usuario', require: true },
    nombre_solicito: { type: String, requiered: true },
}, {
    versionKey: false
});//crear los campos y especificas las propiedades

module.exports = model('Bitacora', BitacoraSchema); //Exportas el modelo y le asignas el nombre de Usuario

