const { response } = require('express');
const bcryptjs = require('bcryptjs');



const Usuario = require('../models/usuario')

const UsuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    })
}

const UsuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de detos

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const UsuariosPost = async(req, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.json({
        usuario
    })
}

const UsuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    })
}

const UsuariosDelete = async(req, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    // const usuario = await Usuario.findOneAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json(usuario, usuarioAutenticado)
}

module.exports = {
    UsuariosGet,
    UsuariosPut,
    UsuariosPost,
    UsuariosPatch,
    UsuariosDelete
}