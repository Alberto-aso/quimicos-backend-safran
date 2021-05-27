const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => { //Crear una nueva promesa para usar el acync y awaite al momento de declararlo
        const payload = {
            uid
        }; //Guardar el uid del usaurio que sera el que se tendra como JWT

        jwt.sign(payload, process.env.JWT_SECRET, { //juntar informacion uid, variable el JWT creada en .env
            expiresIn: '8h' //Duracion el JWT
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar JWT");
            } else {
                resolve(token); //regresamos el JWT
            }
        });

    });

}

module.exports = {
    generarJWT
}