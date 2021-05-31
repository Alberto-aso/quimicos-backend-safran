const { response } = require('express'); // Autocompeltado response

const Bitacora = require('../models/bitacora.model'); //Importar el modelo del controlador
const Usuario = require('../models/usuario.model'); //Importar el modelo del controlador
const Quimico = require('../models/quimico.model'); //Importar el modelo del controlador

const bitacoraCtrl = {}; //constante del controlador

//Get Bitacora
bitacoraCtrl.getBitacora = async (req, res = response) => {
    try {

        const registro = await Bitacora.find().populate('id_usuario_entrego', 'nombre').populate('id_quimico', 'descripcion'); //traer datos de Bitacora

        const quimico = await Quimico.findById(registro[0].id_quimico).populate('nro_parte', 'numero'); //Traer datos del quimico

        res.status(200).json({
            ok: true,
            msg: "Get Bitacora",
            registro,
            quimico
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}

//POST Bitacora
bitacoraCtrl.postBitacora = async (req, res = response) => {

    const udi = req.uid //Obtenemos Id del Usuario responsable de la Entrega
    const quimico = req.body.id_quimico; //Obtener quimico del Body

    try {

        if (quimico) {

            const quimicoDB = await Quimico.findById(quimico); //Verificar que exista el quimico

            if (!quimicoDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No existe Quimico con ese ID"
                });
            }

        }

        req.body.f_uso = Date.now();//Guardar la fecha actual del regitro
        req.body.id_usuario_entrego = udi;//Declarar responsable de la entrega del quimico

        const bitacora_registro = new Bitacora(req.body); //Crear nuevo ojbeto con el modelo de Bitacora

        await bitacora_registro.save();// Guardar el nuevo registro

        res.status(200).json({
            ok: true,
            msg: "POST Bitacora",
            bitacora_registro
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}
//PUT Bitacora
bitacoraCtrl.putBitacora = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros

    try {


        const bitacoraDB = await Bitacora.findById(id); //Evaluar si existe el nroParte por ese ID

        if (!bitacoraDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro Registro"
            });
        }

        const bitacoraNew = await Bitacora.findByIdAndUpdate(id, req.body, { new: true }) //Mandar la actualizacion a la base de datos

        res.status(200).json({
            ok: true,
            msg: "PUT Bitacora",
            bitacoraNew
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }

}

//DELETE Bitacora
bitacoraCtrl.deleteBitacora = async (req, res = response) => {

    id = req.params.id; //Obtener id de los parametros 

    try {

        const registroDB = await Bitacora.findById(id); //Evaluar que el registro exista

        if (!registroDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro registro"
            });
        }

        await Bitacora.findByIdAndDelete(id); //Mandar a borrar el Registro

        res.status(200).json({
            ok: true,
            msg: "DELETE Bitacora"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

module.exports = bitacoraCtrl;