const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos-controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validarJWT } = require('../middlewares/validar-jwt');


// Ruta: /api/medicos
const router = Router();

router.get('/', validarJWT, getMedicos);

router.post(
  '/', 
  [ 
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id hospital debe ser valido').isMongoId(),
    validateFields
  ],
  crearMedico
);

router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id hospital debe ser valido').isMongoId(),
    validateFields
  ],
  actualizarMedico
);

router.delete('/:id', validarJWT, borrarMedico);

router.get('/:id', validarJWT, getMedicoById);

module.exports = router;