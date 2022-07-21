/* ---------- Ayuda!! ----------
*   Configuracion de Moongoose de la DB
*/
//-Importaciones:
const mongoose = require('mongoose');

//-Contenido:
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        });
        console.log('Successful database connection');
        
    } catch (error) {
        console.log(error);
        throw new Error('Database connection failed')
    }
}

//-Exportaciones:
module.exports = {
    dbConnection
}