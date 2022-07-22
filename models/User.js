/* ---------- Ayuda!! ----------
*   Modelo de usuario en DB
*/
//-Importaciones:
const {Schema, model, trusted} = require('mongoose');

//-Contenido:
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//-Exportaciones:
module.exports = model('User', UserSchema);