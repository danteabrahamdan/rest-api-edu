const { Router } = require('express');
const { check } = require('express-validator');
const { obtUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios-controller');
const { validateFields } = require('../middlewares/validate-fields');


// Ruta REST API /api/usuarios
const router = Router();

router.get('/', obtUsuarios);

router.post(
  '/', 
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validateFields
  ],
  crearUsuario
);

router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    validateFields
  ],
  actualizarUsuario
);

router.delete('/:id', borrarUsuario);

module.exports = router;