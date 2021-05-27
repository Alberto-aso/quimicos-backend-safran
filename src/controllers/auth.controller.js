const { response } = require('express'); //ayuda en las respuestas
const Usuario = require('../models/usuario.model');//Importar modelo Usuario
const encriptar = require('bcryptjs');//Importar Encriptacion
const { generarJWT } = require('../helpers/jwt'); //importar el servicio token

const loginCtrl = {}; //Constante controlador

loginCtrl.login = async (req, res = response) => {

    req.body.email = req.body.email.toLowerCase() + "@safrangroup.com"; // Agregar safrangroup.com

    const { email, password } = req.body; // Extraer datos del body para Validar

    try {

        //CORREO
        const usuarioDB = await Usuario.findOne({ email });//Encontrar usuario por correo

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Correo no Valido"
            });
        } //Verificar CORREO

        //PASSWORD
        const validarPassword = encriptar.compareSync(password, usuarioDB.password); //Validar password

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Password no valido"
            })
        }

        //Generar Token - JWT
        const token = await generarJWT(usuarioDB._id); //Le mandamos el id del usuario

        res.json({
            ok: true,
            msg: "Login RUTA",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}// login controller

module.exports = loginCtrl;