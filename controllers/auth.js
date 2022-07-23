/* ---------- Ayuda!! ----------
*   Controladores AUTH
*/
//-Importaciones:
const {response} =  require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

//-Contenido:
const newUser = async(req, res = response) => {
    const {email, password } = req.body; 
    try {
        //Validación de email
        let user = await User.findOne({email});
        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists',
            });
        }
        user = new User(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        //Guardar nuevo usuario en DB
        await user.save();
        //Generar JWT
        const token = await generateJWT(user.id, user.name);
        //Response correct
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin',
        });
    }       
}

const loginUser = async(req, res = response) => {
    const {email, password } = req.body;
    try {
        //Validación de email
        const user = await User.findOne({email});
        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Username or password is incorrect',
            });
        }
        // Validar password
        const validPassword = bcrypt.compareSync(password, user.password);
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Username or password is incorrect',
            });
        }
        //Generar JWT
        const token = await generateJWT(user.id, user.name);        
        //Response correct
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'talk with the admin',
        }); 
    }
    
}

const revalidateToken = async(req, res = response) => {
    const {uid, name} = req;
    //Generar un JWT
    const token = await generateJWT(uid, name);  
    //Response correct
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

//-Exportaciones:
module.exports = {
    newUser,
    loginUser,
    revalidateToken
}