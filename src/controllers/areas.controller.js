const { response } = require('express'); // Autocompeltado response

const Area = require('../models/area.modelo'); //Importar el modelo del controlador


const areaCtrl = {}; //constante del controlador

//Get areas
areaCtrl.getAreas = async (req, res = response) => {

    try {

        const areasDB = await Area.find(); //Encontrar todas las areas

        if (areasDB == "") {
            return res.status(404).json({
                ok: false,
                msg: "No hay registros"
            });
        } //Condicion si no se encuentran registros

        res.status(200).json({
            ok: true,
            msg: "Get Areas",
            areasDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}
//Get area
areaCtrl.getArea = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los parametros

    try {

        const areaDB = await Area.findById(id); //Encontrar Area por ID

        if (!areaDB) {
            return res.status(402).json({
                ok: false,
                msg: "No se encontro area con ese ID"
            });
        } // Evaluar si el Area existe

        res.status(200).json({
            ok: true,
            msg: "Get Area",
            areaDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

//Post Area
areaCtrl.postArea = async (req, res = response) => {

    const nombre = req.body.nombre; // Obtener nombre de los body

    try {

        const areaDB = await Area.findOne({ "nombre": nombre }); //Encontrar Area con ese nombre 

        if (areaDB) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un Area con ese nombre"
            });
        } //Mandar error si ya existe un Area con ese nombre

        const area = new Area(req.body); //Crear nueva area

        await area.save();

        res.status(200).json({
            ok: true,
            msg: "POST Area",
            nombre
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}
//Put Area
areaCtrl.putArea = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros

    try {

        const areaDB = await Area.findById(id); //Evaluar si existe el Area por ese ID

        if (!areaDB) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro area con ese ID"
            });
        }

        const areaActualizada = await Area.findByIdAndUpdate(id, req.body, { new: true }) //Mandar la actualizacion a la base de datos

        res.status(200).json({
            ok: true,
            msg: "PUT Area",
            areaActualizada
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de contactar a Sistemas"
        });
    }
}
//Delete Area
areaCtrl.deleteArea = async (req, res = response) => {

    const id = req.params.id; //Obtener id de los Parametros

    try {

        const areaDB = await Area.findById(id); //Evaluar si existe el Area por ese ID

        if(!areaDB){
            return res.status(404).json({
                ok:false,
                msg:"No se encontro Area con ese ID"
            });
        }

        await Area.findByIdAndDelete(id); //Eliminas el Area

        res.status(200).json({
            ok: true,
            msg: "DELETE Area",
            areaDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Favor de cotnactar a Sistemas"
        });
    }
}

module.exports = areaCtrl;