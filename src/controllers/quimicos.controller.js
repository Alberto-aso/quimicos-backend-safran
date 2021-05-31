const { response } = require('express'); // Autocompeltado response

const Quimico = require('../models/quimico.model'); //Importar el modelo del controlador
const Usuario = require('../models/usuario.model'); //Importar el modelo del controlador
const Area = require('../models/area.modelo'); //Importar el modelo del controlador
const Nro_Parte = require('../models/nro-parte.model'); //Importar el modelo del controlador

const quimicoCtrl = {}; //constante del controlador

//Get usuarios
quimicoCtrl.getQuimicos = async (req, res = response) => {

    try {

        const quimicosDB = await Quimico.find().populate('id_creador', 'nombre').populate('id_responsable', 'nombre')
            .populate('area', 'nombre').populate('nro_parte', 'numero'); //Obtener Quimicos y traer datos de las llaves foraneas

        res.status(200).json({
            ok: true,
            msg: "Get Quimicos",
            quimicosDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

//Get usuarios
quimicoCtrl.getQuimico = async (req, res = response) => {

    const id = req.params.id; //obtener Id del los parametros

    try {

        const quimicoDB = await Quimico.findById(id); //Verificar que exista el Quimico

        if (!quimicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro Quimico con ese ID",
            });
        }

        res.status(200).json({
            ok: true,
            msg: "Get Quimico",
            quimicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

//POST Quimico
quimicoCtrl.postQuimico = async (req, res = response) => {

    const uid = req.uid; //Guardar Usauario del JWT (id_Creador)
    const u_responsable = req.body.id_responsable; //Guardar Usuario responsable del Quimico
    const nro_parte = req.body.nro_parte; //Guardar numero de parte
    const area = req.body.area; //Guardar el Area

    const quimico = new Quimico({ id_creador: uid, ...req.body }); //Crear nuevo quimico y guardamos el ID del creador por medio del JWT

    try {

        const u_responsableDB = await Usuario.findById(u_responsable); //Evaluar si existe responsable (ID)

        if (!u_responsableDB) {
            res.status(404).json({
                ok: false,
                msg: " Responsable Incorrecto No existe con ese ID"
            });
        }

        const nro_parteDB = await Nro_Parte.findById(nro_parte); //Evaluar si existe numero de parte (ID)

        if (!nro_parteDB) {
            res.status(404).json({
                ok: false,
                msg: " Numero de Parte Incorrecto No existe con ese ID"
            });
        }

        const areaDB = await Area.findById(area); //Evaluar si existe Area (ID)

        if (!areaDB) {
            res.status(404).json({
                ok: false,
                msg: " Numero de Parte Incorrecto No existe con ese ID"
            });
        }

        const NewQuimico = await quimico.save(); //Guardar nuevo Quimico


        res.status(200).json({
            ok: true,
            msg: "POST Quimico",
            NewQuimico
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}
//PUT Quimico
quimicoCtrl.putQuimico = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros
    const uid = req.uid; //Guardar Usauario del JWT (id_Creador)
    const u_responsable = req.body.id_responsable; //Guardar Usuario responsable del Quimico
    const nro_parte = req.body.nro_parte; //Guardar numero de parte
    const area = req.body.area; //Guardar el Area

    try {


        const quimicoDB = await Quimico.findById(id); //Evaluar si existe el nroParte por ese ID

        if (!quimicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro Quimico con ese ID"
            });
        }

        if (u_responsable) { //Si se manda nuevo responsable Evaluar si Existe

            const responsableDB = await Usuario.findById(u_responsable);

            if (!responsableDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No se encontro responsable con ese ID"
                });
            }

        }

        if (nro_parte) { //Si se manda nuevo nmero de parte Evaluar si Existe

            const nroParteDB = await Nro_Parte.findById(nro_parte);

            if (!nroParteDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No se encontro Numero de parte con ese ID"
                });
            }
        }

        if (area) { //Si se manda nueva Area Evaluar si Existe

            const areaDB = await Area.findById(area);

            if (!areaDB) {
                return res.status(404).json({
                    ok: false,
                    msg: "No se encontro Area con ese ID"
                });
            }
        }

        req.body.id_creador = uid; //Evaluar responsable de ultima actualizacion

        const quimicoNew = await Quimico.findByIdAndUpdate(id, req.body, { new: true }) //Mandar la actualizacion a la base de datos

        res.status(200).json({
            ok: true,
            msg: "PUT Quimico",
            quimicoNew,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }

}

//DELETE Quimico
quimicoCtrl.deleteQuimico = async (req, res = response) => {

    const id = req.params.id; //Obtener Id de los parametros

    try {

        const quimicoDB = await Quimico.findById(id); //Verificar que el Quimico Exista

        if (!quimicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontrol Quimico con ese ID"
            });
        }

        await Quimico.findByIdAndDelete(id);//Mandar a borrar registro

        res.status(200).json({
            ok: true,
            msg: "DELETE Quimico",
            quimicoDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

module.exports = quimicoCtrl;