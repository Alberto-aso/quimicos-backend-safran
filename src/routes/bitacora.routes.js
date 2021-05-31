// '/api/quimicos'

//modulos/plugings
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');//validator

//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

const bitacoraCtrl = require('../controllers/bitacora.controller'); //Imporar Controlador de la ruta Bitacora


router.get('/', [], bitacoraCtrl.getBitacora); //get Bitacora
router.post('/',
    [
        validarJWT,
        check('id_quimico', 'El ID del Quimico es Obligatorio').not().isEmpty(),
        check('nombre_solicito', 'El Usuario que solicito es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , bitacoraCtrl.postBitacora); //Post Bitacora
router.put('/:id',
    [
        check('nombre_solicito', 'El password es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , bitacoraCtrl.putBitacora);//Put Bitacora
router.delete('/:id', [], bitacoraCtrl.deleteBitacora);//DELETE Bitacora


module.exports = router;
