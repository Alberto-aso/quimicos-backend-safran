// '/api/areas'

//modulos/plugings
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');//validator campos

//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const areaCtrl = require('../controllers/areas.controller'); //Imporar Controlador de la ruta Areas


router.get('/', [], areaCtrl.getAreas); //get areas
router.get('/:id', [], areaCtrl.getArea); //get area
router.post('/',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , areaCtrl.postArea); //Post area
router.put('/:id',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , areaCtrl.putArea);//Put area
router.delete('/:id', [], areaCtrl.deleteArea);//DELETE area


module.exports = router;
