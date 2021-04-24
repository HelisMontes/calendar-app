/**
 * Rutas de Eventos
 * hots + /api/events
 */

const { Router } = require ('express');
const { check } = require ('express-validator');
 
const { getEvents, createEvent, updateEvent, deleteEvent  } = require('../controllers/events');
const { validarToken } = require ('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate, isDateEnd } = require('../helpers/validate-date');
 
const events = Router();
 
//Todas las rutas tienen que pasar por la validación del JWT
events.use(validarToken)
 
events.get('/', getEvents);
events.post(
   '/', 
   [
     check('title', 'El titulo es requerido').not().isEmpty(),
     check('start', 'La fecha inicial es requerida').custom(isDate),
     check('end', 'La fecha final es requerida').custom(isDateEnd),
     validarCampos
   ],
   createEvent);
events.put(
   '/:id', 
   [
     check('title', 'El titulo es requerido').not().isEmpty(),
     check('start', 'La fecha inicial es requerida').custom(isDate),
     check('end', 'La fecha final es requerida').custom(isDateEnd),
     validarCampos
   ],
   updateEvent);
events.delete('/:id', deleteEvent);
 
module.exports = events;