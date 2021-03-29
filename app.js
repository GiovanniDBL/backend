const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const configMensaje = require('./configMensaje');
// const helmet = require('helmet');

// Initializations
const app = express();
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
app.use('/user1', user_routes);
app.use('/user2', user_routes);
app.use('/user3', user_routes);


app.post('/formulario', (req, res) => {
        configMensaje(req.body);
        res.status(200).send();
    })
    // Start Server
app.listen(ports, () => {
    console.log(`Servidor Corriendo, Port ${ports}`)
});