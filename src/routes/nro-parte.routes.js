// '/api/nro-parte'

//modulos/plugings
const { Router } = require('express'); //modulo de Rutas
const { check } = require('express-validator');//validator campos

//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const nroParteCtrl = require('../controllers/nro-parte.controller'); //Imporar Controlador de la ruta Areas


router.get('/', [], nroParteCtrl.getNroParteAll); //get nroParte
router.get('/:id', [], nroParteCtrl.getNroParte); //get nroParte
router.post('/',
    [
        check('numero', 'El numero es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , nroParteCtrl.postNroParte); //Post nroParte
router.put('/:id',
    [
        check('numero', 'El numero es Obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , nroParteCtrl.putNroParte);//Put nroParte
router.delete('/:id', [], nroParteCtrl.deleteNroParte);//DELETE nroParte


module.exports = router;
