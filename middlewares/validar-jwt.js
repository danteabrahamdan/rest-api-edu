const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { request, response } = require('express');


const validarJWT = (req=request, res=response, next) => {
  const token = req.header('x-token');

  if(!token) {
    return res.status(401).json({ ok: false, msg: 'No hay token en la petición' });
  }
  
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.uid = uid;
    next();
  }
  catch(error) {
    return res.status(401).json({ ok: false, msg: 'Token no valido' });
  }
}

module.exports = { validarJWT }