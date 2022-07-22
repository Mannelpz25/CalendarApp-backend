/* ---------- Ayuda!! ----------
*    Rutas de Eventos
*    host + /api/events    
*/
//-Importaciones:
const express =  require('express');
const { check } = require('express-validator');
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = express.Router();

//-Contenido:
//Validar rutas por JWT
router.use(jwtValidator);
//Obtener eventos
router.get('/', getEvents );
//Crear evento
router.post(
    '/',
    [ //Middlewares
        check('title', 'title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ], 
    newEvent);
//Actualizar evento
router.put(
    '/:id',
    [ //Middlewares
        check('title', 'title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    updateEvent);
//Eliminar evento
router.delete('/:id', deleteEvent);
//-Exportaciones:
module.exports = router;