const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, borrarHospitales } = require('../controllers/hospitales-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');

// Ruta: /api/hospitales
const router = Router();

router.get('/', validarJWT, getHospitales);

router.post(
  '/', 
  [ 
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validateFields
  ],
  crearHospital
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
    validateFields
  ],
  actualizarHospital
);

router.delete('/:id', validarJWT, borrarHospitales);

module.exports = router;