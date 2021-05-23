'use strict'

require('dotenv').config(); //Declaracion de variables de entorno

//Database Conexion
const { dbConnection } = require('./database'); // importacion de la conexion a la base de datos
dbConnection(); //Llamar conexion base de datos

const app = require('./app');

//Declaracion del servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + " " + process.env.PORT);
});