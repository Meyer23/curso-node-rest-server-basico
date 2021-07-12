const { Router } = require('express');
const {
    UsuariosGet,
    UsuariosPut,
    UsuariosPost,
    UsuariosPatch,
    UsuariosDelete
} = require('../controller/usuarios');

const router = Router();

router.get('/', UsuariosGet)

router.put('/:id', UsuariosPut);

router.post('/', UsuariosPost);

router.patch('/', UsuariosPatch);

router.delete('/', UsuariosDelete);



module.exports = router;