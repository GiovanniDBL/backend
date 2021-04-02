const { loginUsers } = require('../models/login.models')
const easyConection = require('../database/database');
const { request } = require('http');
const { send } = require('process');
const bcrypt = require('bcryptjs');
const { usuarios } = require('../models/user.model')


function AuthController(request, response) {

    const palabrasecreta = usuarios.pass;

    const params = request.body;

    loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;
    loginUsers.nombre = params.nombre;


    let query_verify = `CALL getUsers(?,?,?);`;

    if (loginUsers.cuenta && loginUsers.nombre && loginUsers.pass) {

        bcrypt.compareSync(usuarios.pass, loginUsers.pass)

        easyConection.query(query_verify, [loginUsers.cuenta, loginUsers.nombre, loginUsers.pass], (err, rows) => {

            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {

                let result = JSON.parse(JSON.stringify(rows[0]));

                if (JSON.stringify(result) == '[]') {
                    response.status(404).send({ message: 'EL USUARIO NO EXISTE' });
                } else {
                    response.status(200).send({ message: 'EL USUARIO SI EXISTE' });
                }



                // response.status(200).send({ message: 'USUARIO CORRECTO' });
            }

        });
    } else {

        response.status(400).send({ message: 'Faltan datos de usuario' });
    }
}

module.exports = {
    AuthController
}