//Declaracion de DEPENDENCIAS
const express = require('express'); //Express es la funcionabilidad del servidor
const cors = require('cors');


const app = express(); //Creacion del servidor EXPRESS
app.use(cors()); //Declaracion CORS
app.use(express.json());//Configurar la aplicacion para que entienda objetos JSON

//RUTAS
app.use('/api/usuarios', require('./routes/usuarios.routes')); //Ruta Usuarios
app.use('/api/login', require('./routes/auth.routes')); //Ruta Usuarios

module.exports = app;  //Exportar app a index.js