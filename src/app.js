//Declaracion de DEPENDENCIAS
const express = require('express'); //Express es la funcionabilidad del servidor
const cors = require('cors');


const app = express(); //Creacion del servidor EXPRESS
app.use(cors()); //Declaracion CORS
app.use(express.json());//Configurar la aplicacion para que entienda objetos JSON

//RUTAS
app.use('/api/usuarios', require('./routes/usuarios.routes')); //Ruta Usuarios
app.use('/api/quimicos', require('./routes/quimicos.routes')); //Ruta Quimicos
app.use('/api/login', require('./routes/auth.routes')); //Ruta Login
app.use('/api/areas', require('./routes/areas.routes')); //Ruta Area
app.use('/api/nro-parte', require('./routes/nro-parte.routes')); //Ruta NroParte
app.use('/api/bitacora', require('./routes/bitacora.routes')); //Ruta NroParte

module.exports = app;  //Exportar app a index.js