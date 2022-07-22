/* ---------- Ayuda!! ----------
*   Validación de Fecha
*/
//-Importaciones:
const moment = require('moment');

//-Contenido:
const isDate = (value) => {
    if(!value){
        return false;
    }
    const date = moment( value );
    if(date.isValid()){
        return true;
    } else {
        return false;
    }
}

//-Exportaciones:
module.exports = {
    isDate
};