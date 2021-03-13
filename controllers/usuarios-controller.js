const Usuario = require('../models/usuario');
const { request, response } = require('express');
const { validationResult } = require('express-validator');


const obtUsuarios = async (req=request, res=response) => {
  const usuarios = await Usuario.find({}, 'nombre email role google');
  res.json({ ok: true, usuarios });
}

const crearUsuario = async (req=request, res=response) => {
  const { email, password, nombre } = req.body;
  const errores = validationResult(req);

  if(!errores.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errores.mapped() });
  }

  try {
    const existeEmail = await Usuario.findOne({ email });

    if(existeEmail) {
      return res.status(400).json({ ok: false, msg: 'El correo ya esta registrado' });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({ ok: true, usuario });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error inseperado en el servidor' });
  }
}

module.exports = { obtUsuarios, crearUsuario }