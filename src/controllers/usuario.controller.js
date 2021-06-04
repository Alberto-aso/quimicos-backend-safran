const { response } = require('express'); // Autocompeltado response
const encriptar = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt'); //importar el servicio token

const Usuario = require('../models/usuario.model'); //Importar el modelo del controlador


const usuarioCtrl = {}; //constante del controlador

//Get usuarios
usuarioCtrl.getUsuarios = async (req, res = response) => {

    const desde = Number(req.query.desde) || 0; //Obtenemos el valor de la paginacion y lo comvertimos a numero si no igualamos a 0

    try {

        const [usuarios, total] = await Promise.all([
            Usuario.find({}, 'nombre apellido rol email')
                .skip(desde).limit(5),
            Usuario.countDocuments()
        ]); //  Sustituye a dos funciones independientes y las hace simultaneas const total = await Usuario.count();

        res.status(200).json({
            ok: true,
            msg: "Usuarios Registrados en DB",
            usuarios,
            total,
            UsuarioLogin: req.uid //Mandas el usuario que esta logeado JWT
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}; //FIN Get usuarios

//GET one usuario
usuarioCtrl.getUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No hay usaurio con ese ID"
            });
        }
        res.status(500).json({
            ok: true,
            msg: "only one user",
            usuarioDB,
            UsuarioLogin: req.uid //Mandas el usuario que esta logeado JWT
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}

//POST usuario
usuarioCtrl.postUsuario = async (req, res = response) => {

    req.body.email = req.body.email.toLowerCase() + "@safrangroup.com"; //Agregar correo SAFRAN

    try {

        existeDB = await Usuario.findOne({ 'email': req.body.email });//Revisar si el correo ya existe

        if (existeDB) { //si existe mandas error

            return res.status(500).json({
                ok: false,
                msg: "El usuario ya existe" + " " + req.body.email,
            });

        }

        const usuario = new Usuario(req.body); //Crear nuevo usuario

        //Encriptar Password
        const salt = encriptar.genSaltSync(); //Generar datos aleatorios
        usuario.password = encriptar.hashSync(req.body.password, salt);// Unir password con Salt(texto aleatorio)

        await usuario.save(); //Guardar nuevo usuario en la base de datos

        //Generar Token - JWT
        //const token = await generarJWT(usuario._id); //Le mandamos el id del usuario

        res.json({
            ok: true,
            msg: 'Usuario Creado',
            usuario,
            //token,
            UsuarioLogin: req.uid //Mandas el usuario que esta logeado JWT
        });

    } catch (error) {
        console.log(error),
            res.status(500).json({
                ok: false,
                msg: "favor de contactar a sistemas"
            });
    }


} // FIN POST usuario

usuarioCtrl.putUsuario = async (req, res = response) => {

    const uid = req.params.id;//Guardar el Id del URL

    req.body.email = req.body.email.toLowerCase() + "@safrangroup.com"; //Agregar correo SAFRAN

    try {


        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe usuario con ese ID"
            });
        }

        //TODO:Validar Token y comprobar si es usuario correcto y admin

        //Actualizacion
        const { password, email, ...campos } = req.body;//Eliminamos el password del body

        if (usuarioDB.email != email) {

            existeDB = await Usuario.findOne({ email });//Revisar si el correo ya existe

            if (existeDB) { //si existe mandas error

                return res.status(500).json({
                    ok: false,
                    msg: "El usuario ya existe" + " " + req.body.email,
                });

            }
        }

        campos.email = email; //regresamos el email al si pasa el IF

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            msg: "Actualizar usuario",
            usuario: usuarioActualizado,
            UsuarioLogin: req.uid //Mandas el usuario que esta logeado JWT
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: "Favor de Contactar a Sistemas"
        });
    }

}

usuarioCtrl.deleteUsuario = async (req, res = response) => {

    uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid)

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe usaurio con ese ID"
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: "Usuario Eliminando",
            usuarioDB,
            UsuarioLogin: req.uid //Mandas el usuario que esta logeado JWT
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a sistemas"
        });

    }
}

module.exports = usuarioCtrl; //exportar controlador