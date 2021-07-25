const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login', login);

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);



router.post('/google', googleSignin);

router.post('/google', [
    check('id_token', 'El id_token es necesario').isEmail(),
    validarCampos
], googleSignin);



module.exports = router