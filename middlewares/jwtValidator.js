/* ---------- Ayuda!! ----------
*    Validador de JWT
*/
//-Importaciones:
const {response} = require('express');
const jwt = require('jsonwebtoken');

//-Contenido:
const jwtValidator = (req, res = response, next) => {
    // x-token headers
    const token = req.header('x-token');
    if(!token){
        return req.status(401).json({
            ok: false,
            msg: 'Token was not sent'
        });
    }
    try {
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        });
    }



    next();
}

//-Exportaciones:
module.exports = {
    jwtValidator
}