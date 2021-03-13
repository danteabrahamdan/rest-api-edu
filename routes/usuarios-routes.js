const { Router } = require('express');
const { check } = require('express-validator');
const { obtUsuarios, crearUsuario } = require('../controllers/usuarios-controller');


// Ruta REST API /api/usuarios
const router = Router();

router.get('/', obtUsuarios);

router.post(
  '/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail()
  ],
  crearUsuario
);

module.exports = router;