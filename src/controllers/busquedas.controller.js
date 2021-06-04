const { response } = require('express'); // Autocompeltado response

const Usuario = require('../models/usuario.model'); //Importar el modelo del controlador
const Quimico = require('../models/quimico.model'); //Importar el modelo del controlador
const Bitacora = require('../models/bitacora.model'); //Importar el modelo del controlador
const NumeroParte = require('../models/nro-parte.model'); //Importar el modelo del controlador


const busquedaCtrl = {}; //constante del controlador

//Get nroParte
busquedaCtrl.getColeccion = async (req, res = response) => {

    const coleccion = req.params.coleccion;
    const parametro = req.params.parametro;
    const regex = new RegExp(parametro, 'i'); //Evaliamos parametro como exprecion regular 

    try {

        let data = [];

        switch (coleccion) {
            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            case 'quimicos':
                const nroParte = await NumeroParte.find({numero: parametro});
                if(nroParte){
                    return res.status(404).json({
                        ok:false,
                        msg:"no se encontro quimico con ese numero de parte"
                    });
                }
                const idNumeroParte = nroParte._id;
                //data = await Quimico.find({ lote: regex });
                data = [idNumeroParte]
                break;
            case 'bitacora':

                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: "La tabla tiene que ser usuarios/quimico/bitacora"
                });
        }

        res.status(200).json({
            ok: true,
            msg: "Get Coleccion",
            coleccion,
            parametro,
            data
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}



module.exports = busquedaCtrl;