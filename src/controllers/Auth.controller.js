const { loginUsers, usuarios_panel } = require('../models/login.models')
const easyConection = require('../database/database');
const jwt = require('jsonwebtoken');


//* DECLARE JWT-secret
const JWT_Secret = 'Dany_Bl98';
//* LOGIN DE PÁGINA WEB EASYACCESS
function AuthController(request, response) {

    const token = jwt.sign({ loginUsers }, 'my_secret_key');
    const params = request.body;

    loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;
    loginUsers.nombre = params.nombre;


    let query_verify = `CALL getUsers(?,?,?);`;

    if (loginUsers.cuenta && loginUsers.nombre && loginUsers.pass) {

        easyConection.query(query_verify, [loginUsers.cuenta, loginUsers.nombre, loginUsers.pass], (err, rows) => {

            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {

                let result = JSON.parse(JSON.stringify(rows[0]));

                if (JSON.stringify(result) == '[]') {
                    response.status(404).send({ message: 'EL USUARIO NO EXISTE' });
                } else {
                    response.status(200).send({ message: `EL USUARIO ${loginUsers.nombre} SI EXISTE`, token: token });

                }
                // response.status(200).send({ message: 'USUARIO CORRECTO' });
            }

        });
    } else {

        response.status(400).send({ message: 'Faltan datos de usuario' });
    }
}

//* LOGIN DE PANEL EASYACCESS
function AuthPanel(request, response) {


    const params = request.body;

    usuarios_panel.nombre = params.pass;
    usuarios_panel.pass = params.nombre;
    usuarios_panel.id_roles = params.id_roles;


    let query_verify = `CALL getUsers(?,?,?);`;

    if (loginUsers.cuenta && loginUsers.nombre && loginUsers.pass) {

        easyConection.query(query_verify, [loginUsers.cuenta, loginUsers.nombre, loginUsers.pass], (err, rows) => {

            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {

                let result = JSON.parse(JSON.stringify(rows[0]));

                if (JSON.stringify(result) == '[]') {
                    response.status(404).send({ message: 'EL USUARIO NO EXISTE' });
                } else {
                    response.status(200).send({ message: `EL USUARIO ${loginUsers.nombre} SI EXISTE`, token: token });

                }
                // response.status(200).send({ message: 'USUARIO CORRECTO' });
            }

        });
    } else {

        response.status(400).send({ message: 'Faltan datos de usuario' });
    }
}



module.exports = {
    AuthController,
    AuthPanel
}