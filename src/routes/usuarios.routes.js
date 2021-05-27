// '/api/usuarios'

//modulos/plugings
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');//validator

//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

const usuarioCtrl = require('../controllers/usuario.controller'); //Imporar Controlador de la ruta usuarios


router.get('/', [validarJWT], usuarioCtrl.getUsuarios); //get usuario
router.get('/:id', [validarJWT], usuarioCtrl.getUsuario); //get usuario
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es Obligatorio').not().isEmpty(),
        check('password', 'El password es Obligatorio').not().isEmpty(),
        check('email', 'El Email es Obligatorio').not().isEmpty(),
        validarCampos,
    ], usuarioCtrl.postUsuario); //Post usuario
router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es Obligatorio').not().isEmpty(),
        check('rol', 'El Rol es Obligatorio').not().isEmpty(),
        check('email', 'El Email es Obligatorio').not().isEmpty(),
        validarCampos,
    ], usuarioCtrl.putUsuario);//Put Usuario
router.delete('/:id', [validarJWT], usuarioCtrl.deleteUsuario);//DELETE usuario


module.exports = router;