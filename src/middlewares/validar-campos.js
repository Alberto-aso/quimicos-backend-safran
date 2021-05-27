const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }

    var noValido = / /;

    if(noValido.test(req.body.email)){
        return res.status(500).json({
            ok:false,
            msg: "El correo no puede contener espacios"
        });
    }

    next();

}

module.exports = {
    validarCampos
};