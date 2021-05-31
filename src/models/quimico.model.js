'use strict'

const { Schema, model } = require('mongoose'); //constantes para crear modelo

const QuimicoSchema = Schema({

    nro_parte: { type: Schema.Types.ObjectId, ref: 'NroPArte', required: true },
    lote: { type: String, requiered: true },
    area: { type: Schema.Types.ObjectId, ref: 'Area', required: true },
    descripcion: { type: String },
    disponible: { type: Boolean, requiered: true, default: true },
    f_ingreso: { type: Date, requiered: true },
    f_expiracion: { type: Date, requiered: true },
    id_responsable: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    id_creador: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },

}, {
    versionKey: false
});//crear los campos y especificas las propiedades

module.exports = model('Quimico', QuimicoSchema); //Exportas el modelo y le asignas el nombre de Usuario

