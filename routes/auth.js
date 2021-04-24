/**
 * Rutas de Usuarios / Auth
 * hots + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { addUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validarToken } = require('../middlewares/validar-jwt');
 
const router = Router();

router.get('/renew', validarToken ,revalidateToken );

router.post(
  '/',
  [
    check('email', 'El e-mail es obligatorio').isEmail(),
    check('password', 'El password debe contener mínimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ], loginUser);

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El e-mail es obligatorio').isEmail(),
    check('password', 'El password debe contener mínimo 6 caracteres').isLength({min: 6}),
    validarCampos
  ],
  addUser);

module.exports = router;