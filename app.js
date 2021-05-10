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

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});


// *REGISTRACIÓN PRUEBA TUTORIAL
app.post('/register', async(req, res) => {

    const user = req.body.user;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8)

    connection.query('INSERT INTO panel_users SET ?', { rol: rol, nombre: user, pass: passwordHash }, async(error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "¡Succesful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })

})

// *AUTHENTICATION PRUEBA TUTORIAL
app.post('/auth', async(req, res) => {
    const nombre = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);

    if (nombre && pass) {
        connection.query('SELECT * FROM panel_users WHERE nombre = ?', [nombre], async(error, results) => {
            if (results.lenght == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {

                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: 'login'
                })
            } else {
                req.session.loggedin = true;
                req.session.nombre = results[0].nombre;
                req.session.rol = results[0].rol;
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "¡ LOGIN CORRECTO !",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        })
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "¡ Por favor ingrese un usuario y/o password !",
            alertIcon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            ruta: 'login'
        })
    }
})

// *AUTH PAGES
app.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', {
            login: true,
            name: req.session.nombre,
            rol: req.session.rol
        })
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})

// *LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
})



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

//** Crear usuario paneleasyaccess*/
app.use('/registerPanel', user_routes);
//** Login usuario paneleasyacccess*/
app.use('/user', user_routes);
//** Crear notas en el panel */
app.use('/detalles', user_routes);




//** Envíar correo desde el formulario contacto easyaccess */
app.post('/formulario', (req, res) => {
    configMensaje(req.body);
    res.status(200).send();
})

// *Start Server
app.listen(ports, () => {
    console.log(`Servidor Easyaccess Corriendo, Port ${ports}`)
});