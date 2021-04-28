const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
const jwt = require('jsonwebtoken');
// import pkg from './package.json'
const pkg = require('./package.json')


// Initializations
const app = express();

app.set('pkg', pkg);
//Settings
const ports = process.env.PORT || 3000;
// Middleware
app.use(morgan('dev'));
app.use(express.json());



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


//** RUTA INICIAL DEL SERVIDOR 3000 */
app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,

    })

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
    console.log(`Servidor Corriendo, Port ${ports}`)
});