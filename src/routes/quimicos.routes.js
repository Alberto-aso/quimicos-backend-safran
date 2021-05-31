// '/api/quimicos'

//modulos/plugings
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');//validator

//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const quimicoCtrl = require('../controllers/quimicos.controller'); //Imporar Controlador de la ruta Quimicos


router.get('/', [], quimicoCtrl.getQuimicos); //get quimicos
router.get('/:id', [], quimicoCtrl.getQuimico); //get quimico
router.post('/',
    [
        validarJWT,
        check('nro_parte', 'El Nro de Parte es Obligatorio').isMongoId(),
        check('lote', 'El Lote es Obligatorio').not().isEmpty(),
        check('f_ingreso', 'La Fecha de Ingreso es Obligatorio').not().isEmpty(),
        check('f_expiracion', 'La Fecha de Caducidad es Obligatoria').not().isEmpty(),
        check('id_responsable', 'El Responsable es Obligatorio').isMongoId(),
        check('area', 'El Area es Obligatorio').isMongoId(),
        validarCampos,
    ]
    , quimicoCtrl.postQuimico); //Post quimico
router.put('/:id',
    [
        validarJWT,
    ]
    , quimicoCtrl.putQuimico);//Put quimico
router.delete('/:id', [], quimicoCtrl.deleteQuimico);//DELETE quimico


module.exports = router;
