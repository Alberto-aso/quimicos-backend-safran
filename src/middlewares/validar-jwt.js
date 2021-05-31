const { response } = require("express"); //importar response
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => { //Creas constante del Middleware

    //Leer el token
    const token = req.header('x-token'); //recives el token de los headers

    if (!token) { //Validas si el token existe
        return res.status(401).json({
            ok: false,
            msg: "No se Ingreso Token"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET); //verificas que el token sea correcto con la firma que tienens en las variables de entorno

        req.uid = uid; //Mandas el nuevo dato ID del usuario que esta logeado con el JWT

        next(); //Mandas a llamar al sigueinte proceso

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token incorrecto"
        })
    }
}

module.exports = {
    validarJWT
} //Exportar el ValidarJWT