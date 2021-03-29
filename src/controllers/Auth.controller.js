const { loginUsers } = require('../models/login.models')
const easyConection = require('../database/database');

function AuthController(request, response) {

    const params = request.body;

    loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;

    let query = `CALL getUsers(?,?);`;

    if (loginUsers.cuenta && loginUsers.pass) {

        easyConection.query(query, [loginUsers.cuenta, loginUsers.pass], (err) => {

            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {
                response.status(200).send({ message: 'USUARIO CORRECTO' });
            }

        });
    } else {

        response.status(400).send({ message: 'Faltan datos de usuario' });
    }
}

module.exports = {
    AuthController
}