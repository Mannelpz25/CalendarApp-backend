/* ---------- Ayuda!! ----------
*    Rutas de Usuarios / Auth 
*    host + /api/auth    
*/
//-Importaciones:
const express =  require('express');
const {check} = require('express-validator');
const { newUser, loginUser, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const router = express.Router();

//-Contenido:
router.post(
    '/new', 
    [ //Middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have 6 characters at least').isLength({min: 6}),
        fieldValidator
    ],
    newUser);
router.post(
    '/',
    [//Middlewares
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must have 6 characters at least').isLength({min: 6}),
        fieldValidator
    ],
    loginUser);
router.get('/renew', jwtValidator, revalidateToken);

//-Exportaciones:
module.exports = router;