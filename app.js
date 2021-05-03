const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
const jwt = require('jsonwebtoken');



// Invocamos express
const app = express();


// Puerto de servidor

const ports = process.env.PORT || 3000;

// - Seteamos urlencoded para capturar los datos del formulario
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './src/env/.env' })

// directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// Establecer motor de plantillas  ejs
app.set('view engine', 'ejs');

// invocamos a bcryptjs
const bcryptjs = require('bcryptjs');

// variables de session 
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Invocamos el módulo de conexión de la BD
const connection = require('./src/database/db');

// Estableciendo las rutas
//** RUTA INICIAL DEL SERVIDOR 3000 */
app.get('/', (req, res) => {
    res.render('index', { msg: 'ESTO ES UN MENSAJE DESDE NODE' });
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});




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

//Routes

let user_routes = require('./src/routes/reports.routes');

// *** base routes

app.post('/api/login', function(req, res) {
    const user = { id: 3 };
    const token = jwt.sign({ user }, 'my_secret_key');
    res.json({ token: token });
})




// ** Login
app.use('/user1', user_routes);
//** Envíar reporte
app.use('/user2', user_routes);
//** Crear usuario */
app.use('/user3', user_routes);
//** Traer Tickets al panel vuejs
app.use('/tickets', user_routes);
//** Eliminar Tickets de panel vuejs 
app.use('/tickets', user_routes);




//** Envíar correo desde el formulario contacto easyaccess */
app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

// *Start Server
app.listen(ports, () => {
    console.log(`Servidor Easyaccess Corriendo, Port ${ports}`)
});