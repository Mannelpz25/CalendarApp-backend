/* ---------- Ayuda!! ----------
*   Modelo de usuario en DB
*/
//-Importaciones:
const {Schema, model, trusted} = require('mongoose');

//-Contenido:
const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

//-Exportaciones:
module.exports = model('User', UserSchema);