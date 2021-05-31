'use strict'

const { Schema, model } = require('mongoose');

const NroParteSchema = Schema({

    numero: { type: String, required: true }

}, {
    versionKey: false
});

module.exports = model('NroPArte', NroParteSchema);