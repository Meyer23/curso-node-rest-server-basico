const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators')

const {
    UsuariosGet,
    UsuariosPut,
    UsuariosPost,
    UsuariosPatch,
    UsuariosDelete
} = require('../controller/usuarios');

const router = Router();

router.get('/', UsuariosGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], UsuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], UsuariosPost);

router.patch('/', UsuariosPatch);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

], UsuariosDelete);



module.exports = router;