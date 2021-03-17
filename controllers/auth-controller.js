const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req=request, res=response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const usuarioDB = await Usuario.findOne({ email });

    if(!usuarioDB) {
      return res.status(404).json({ ok: false, msg: 'Email no valido' });
    }

    // si pasa verificar contraseña, regresa un true si hace match con la cntraseña de la DB
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if(!validPassword) {
      return res.status(400).json({ ok: false, msg: 'Contraseña no valida' });
    }

    // Generar un token - JWT
    // Un token es utilizado para mantener de forma pasiva el estado del usuario en nuestra aplicación
    // Un JWT consta de 3 partes (header.payload.firma)
    const token = await generarJWT(usuarioDB.id);

    res.json({ ok: true, token });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Algo salio mal' });
  }
}

const googleSignIn = async (req=request, res=response) => {
  const googleToken = req.body.token;

  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if(!usuarioDB) {
      // si no existe el usuario
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true
      });
    }
    else {
      // Existe usuario
      usuario = usuarioDB;
      usuario.google = true;
    }

    // Guardar en DB
    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({ ok: true, token });
  }
  catch (error) {
    res.status(401).json({ ok: false, msg: 'Token no es correcto' });
  }
}

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generar el token
  const token = await generarJWT(uid);
  // Obtener el usuario
  const usuario = await Usuario.findById(uid);

  res.json({ ok: true, token, usuario });
}

module.exports = { login, googleSignIn, renewToken }