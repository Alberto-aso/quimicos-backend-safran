//Declaracion de DEPENDENCIAS
const express = require('express'); //Express es la funcionabilidad del servidor
const cors = require('cors');


const app = express(); //Creacion del servidor EXPRESS

app.use(cors()); //Declaracion CORS

module.exports = app;  //Exportar app a index.js