const { response } = require('express');

const UsuariosGet = (req, res = response) => {
    const { name, id, page = "1" } = req.query
    res.json({
        msg: 'get API - controller',
        name,
        id,
        page
    })
}

const UsuariosPut = (req, res = response) => {

    res.json({
        msg: 'put API - controller'
    })
}

const UsuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    })
}

const UsuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

const UsuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    })
}

module.exports = {
    UsuariosGet,
    UsuariosPut,
    UsuariosPost,
    UsuariosPatch,
    UsuariosDelete
}