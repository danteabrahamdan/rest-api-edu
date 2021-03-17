const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');


// Ruta REST API /api/login
const router = Router();

router.post(
  '/', 
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validateFields
  ],
  login
);

router.post(
  '/google',
  [
    check('token', 'El token de Google es obligatorio').not().isEmpty(),
    validateFields
  ],
  googleSignIn
);

router.get('/renew', validarJWT, renewToken);

module.exports = router;