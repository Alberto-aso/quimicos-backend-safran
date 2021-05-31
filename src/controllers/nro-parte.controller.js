const { response } = require('express'); // Autocompeltado response

const NroParte = require('../models/nro-parte.model'); //Importar el modelo del controlador


const nroParteCtrl = {}; //constante del controlador

nroParteCtrl.getNroParteAll = async (req, res = response) => {

    try {

        const nroParteDB = await NroParte.find(); //Encontrar todas las nroParte

        if (nroParteDB == "") {
            return res.status(404).json({
                ok: false,
                msg: "No hay registros"
            });
        } //Condicion si no se encuentran registros

        res.status(200).json({
            ok: true,
            msg: "Get NroPartes",
            nroParteDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}
//Get nroParte
nroParteCtrl.getNroParte = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los parametros

    try {

        const nroParteDB = await NroParte.findById(id); //Encontrar nroParte por ID

        if (!nroParteDB) {
            return res.status(402).json({
                ok: false,
                msg: "No se encontro nroParte con ese ID"
            });
        } // Evaluar si el nroParte existe

        res.status(200).json({
            ok: true,
            msg: "Get NroParte",
            nroParteDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

//Post nroParte
nroParteCtrl.postNroParte = async (req, res = response) => {

    const numero = req.body.numero; // Obtener numero de los body

    try {

        const nroParteDB = await NroParte.findOne({ "numero": numero }); //Encontrar nroParte con ese numero 

        if (nroParteDB) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un Numero de Parte"
            });
        } //Mandar error si ya existe un nroParte con ese numero

        const nroParte = new NroParte(req.body); //Crear nueva nroParte

        await nroParte.save();

        res.status(200).json({
            ok: true,
            msg: "POST NroParte",
            nroParte
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

//Put nroParte
nroParteCtrl.putNroParte = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros

    try {

        const nroParteDB = await NroParte.findById(id); //Evaluar si existe el nroParte por ese ID

        if (!nroParteDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro nroParte con ese ID"
            });
        }

        const nroParteActualizado = await NroParte.findByIdAndUpdate(id, req.body, { new: true }) //Mandar la actualizacion a la base de datos

        res.status(200).json({
            ok: true,
            msg: "PUT NroParte",
            nroParteActualizado
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}
//Delete nroParte
nroParteCtrl.deleteNroParte = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros

    try {

        const nroParteDB = await NroParte.findById(id); //Evaluar si existe el nroParte por ese ID

        if(!nroParteDB){
            return res.status(404).json({
                ok:false,
                msg:"No se encontro nroParte con ese ID"
            });
        }

        await NroParte.findByIdAndDelete(id); //Eliminas el nroParte

        res.status(200).json({
            ok: true,
            msg: "DELETE NroParte",
            nroParteDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

module.exports = nroParteCtrl;