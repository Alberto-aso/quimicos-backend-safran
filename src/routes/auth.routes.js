//'/api/login' ATH
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const loginCtrl = require('../controllers/auth.controller');//Constante del controlador
const { validarCampos } = require('../middlewares/validar-campos');//Middleware Validar campos


const router = Router();// delcaracion del router

router.post('/',
    [
        check('email', 'El Correo es Obligatorio').not().isEmpty(),
        check('password', 'El Password es Obligatorio').not().isEmpty(),
        validarCampos,
    ], loginCtrl.login);// Login RUTA
router.get('/renew',
    [
        validarJWT
    ], loginCtrl.renewToken);// Login RUTA

module.exports = router; //Exportacion de Router