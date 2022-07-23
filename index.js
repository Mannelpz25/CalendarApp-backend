/* ---------- Ayuda!! ----------
*   Index del servidor
*/
//-Importaciones:
const express =  require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//-Contenido:
// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Público
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );


//.Rutas
// auth: crear, login, renew
app.use('/api/auth', require('./routes/auth'));
// CRUD: Eventos
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
})

// Escuchar peticiones
app.listen(process.env.PORT, () =>{
    console.log(`Server running on port ${process.env.PORT}`);
});

//-Exportaciones:













