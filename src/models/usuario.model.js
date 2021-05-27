'use strict'

const { Schema, model } = require('mongoose'); //constantes para crear modelo

const UsuarioSchema = Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rol: { type: String, required: true, default: 'USER_ROLE' },
    password: { type: String, required: true },
    activo: { type: Boolean, default: true }
}, {
    versionKey: false
}); //crear los campos y especificas las propiedades

UsuarioSchema.method('toJSON', function () { //Eliminar datos como la _v si es que no la quitas en el Schema
    const { _id, password, ...object } = this.toObject(); //extraer datos

    object.uid = _id; //Nombrar el _id --> uid (usuario id)

    return object; //Regresar le objeto modificado
});

module.exports = model('Usuario', UsuarioSchema); //Exportas el modelo y le asignas el nombre de Usuario