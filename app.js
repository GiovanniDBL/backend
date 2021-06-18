const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
const multer = require('multer')


// *Invocamos express
const app = express();

// *Puerto de servidor
const ports = process.env.PORT || 3000;

// *Seteamos urlencoded para capturar los datos del formulario
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// *Invocamos dotenv para la conexión a base de datos¨

const dotenv = require('dotenv');
dotenv.config({ path: './src/env/.env' })


// *** Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(helmet());

// *** set headers HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// *** base routes

let user_routes = require('./src/routes/reports.routes');

// ** Login
app.use('/user1', user_routes);
//** Envíar reporte
app.use('/user2', user_routes);
//** Crear usuario */
app.use('/user3', user_routes);
//* Traer departamentos
app.use('/select', user_routes);
//** Traer Tickets al panel vuejs
app.use('/tickets', user_routes);
//** Eliminar Tickets de panel vuejs 
app.use('/tickets', user_routes);

//** Crear usuario paneleasyaccess*/
app.use('/registerPanel', user_routes);
//** Login usuario paneleasyacccess*/
app.use('/user', user_routes);
//** Crear notas en el panel, Traer notas del reporte, Eliminar Notas */
app.use('/notas', user_routes);





//** Envíar correo desde el formulario contacto easyaccess */
app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

// *Start Server
app.listen(ports, () => {
    console.log(`Servidor Easyaccess Corriendo, Port ${ports}`)
});