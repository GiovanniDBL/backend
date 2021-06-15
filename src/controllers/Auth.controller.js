const { loginUsers, loginPanel } = require('../models/login.models')
const easyConection = require('../database/database');
const connection = require('../database/db');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { Panelusuarios } = require('../models/user.model');


//* DECLARE JWT-secret
const JWT_Secret = 'Dany_Bl98';
//* LOGIN DE PÁGINA WEB EASYACCESS
function AuthController(request, response) {

    const token = jwt.sign({ loginUsers }, 'my_secret_key');
    const params = request.body;

    // loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;
    loginUsers.nombre = params.nombre;


    let query_verify = `CALL getUsers(?,?);`;

    if (loginUsers.nombre && loginUsers.pass) {

        easyConection.query(query_verify, [loginUsers.nombre, loginUsers.pass], (err, rows) => {

            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {

                let result = JSON.parse(JSON.stringify(rows[0]));

                if (JSON.stringify(result) == '[]') {
                    response.status(404).send({ message: 'EL USUARIO NO EXISTE' });
                } else {
                    response.status(200).send({
                        // message: `EL USUARIO ${loginUsers.nombre} SI EXISTE`,
                        message: `Sesión Exitosa`,
                        token: token,
                        nombre: loginUsers.nombre,

                    });

                }
                // response.status(200).send({ message: 'USUARIO CORRECTO' });
            }

        });
    } else {

        response.status(400).send({ message: 'Faltan datos de usuario' });
    }
}

//* REGISTRO DE USUARIO PANEL EASYACCESS
async function NuevoUsuario(request, res) {

    const params = request.body;
    Panelusuarios.nombre = params.nombre;
    Panelusuarios.rol = params.rol;
    Panelusuarios.pass = params.pass;

    let passwordHash = await bcryptjs.hash(Panelusuarios.pass, 8);

    connection.query('INSERT INTO panel_users SET ?', { rol: Panelusuarios.rol, nombre: Panelusuarios.nombre, pass: passwordHash }, async(error, results) => {
        if (error) {
            res.status(500).send({ message: 'ERROR AL CREAR USUARIO' });
        } else {
            res.status(200).send({ message: 'USUARIO CREADO ' });
        }
    })

}

//* LOGIN PANEL EASYACCESS
async function LoginPanel(request, res) {

    const token = jwt.sign({ loginPanel }, 'my_secret_key');
    const params = request.body;

    loginPanel.nombre = params.nombre;
    loginPanel.pass = params.pass;
    let passwordHaash = await bcryptjs.hash(loginPanel.pass, 8);

    if (loginPanel.nombre && loginPanel.pass) {
        connection.query('SELECT * FROM roles INNER JOIN panel_users ON panel_users.rol = roles.rol WHERE nombre = ?', [loginPanel.nombre], async(error, results) => {
            if (results.lenght == 0 || !(await bcryptjs.compare(loginPanel.pass, results[0].pass))) {

                res.status(202).send({ message: 'Usuario y/o password incorrectas' });
                console.log('Usuario y/o password incorrectas');


            } else {



                res.status(200).send({
                    message: `Sesión Exitosa`,
                    token: token,
                    nombre: loginPanel.nombre,
                    role: results[0].rol
                });
                console.log('LOGIN CORRECTO ');
            }
        })
    } else {
        res.status(202).send({ message: 'Por favor ingrese un usuario y/o password' });
        console.log('Por favor ingrese un usuario y/o password');
    }

}



module.exports = {
    AuthController,
    NuevoUsuario,
    LoginPanel
}