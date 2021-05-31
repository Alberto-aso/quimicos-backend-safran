'use strict'

const { Schema, model } = require('mongoose');

const AreaSchema = Schema({

    nombre: { type: String, required: true }

}, {
    versionKey: false
});

module.exports = model('Area', AreaSchema);