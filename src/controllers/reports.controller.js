const { reports } = require('../models/reports.models');
const { usuarios } = require('../models/user.model');
const easyConection = require('../database/database');
const bcrypt = require('bcryptjs');




function newReport(request, response) {

    //*request.json({ message: 'this is protected' });


    const params = request.body;

    reports.id_usuario = params.id_usuario;
    reports.departamento = params.departamento;
    reports.prioridad = params.prioridad;
    reports.reporte = params.reporte;
    //! reports.multimedia = params.multimedia;
    reports.asunto = params.asunto;


    let query = `CALL setTickets (?,?,?,?,?,?);`;

    if (reports.id_usuario && reports.departamento && reports.prioridad && reports.reporte && reports.asunto) {




        easyConection.query(query, [reports.id_usuario, reports.departamento, reports.prioridad, reports.reporte, reports.multimedia, reports.asunto], (err) => {


            if (err) {
                response.status(500).send({ message: 'NÚMERO DE CUENTA INCORRECTO' });
            } else {

                response.status(200).send({ message: 'REPORTE ENVIADO' });
            }


        });



    } else {

        response.status(400).send({ message: 'Faltan datos de reporte' });
    }

}

function newUser(reques, response) {


    const salt = bcrypt.genSaltSync(10);
    const palabrasecreta = usuarios.pass;


    const params = reques.body;

    usuarios.cuenta = params.cuenta;
    usuarios.nombre = params.nombre;
    usuarios.pass = params.pass;
    usuarios.email = params.email;

    let query_saveUser = `CALL setUsers(?,?,?,?);`;


    if (usuarios.cuenta && usuarios.nombre && usuarios.pass && usuarios.email) {

        //* ENCRIPTACIÓN DE CONTRASEÑA
        //* usuarios.pass = bcrypt.hashSync(palabrasecreta, salt);


        easyConection.query(query_saveUser, [usuarios.cuenta, usuarios.nombre, usuarios.pass, usuarios.email], (err) => {

            if (err) {
                response.status(500).send({ message: 'ERROR AL CREAR USUARIO' });
            } else {

                response.status(200).send({ message: 'USUARIO CREADO ' });
            }
        });






        //   easyConection.query(query_saveUser, [usuarios.cuenta, usuarios.nombre, usuarios.pass, usuarios.email], (err) => {

        //        if (err) {
        //            response.status(500).send({ message: 'ERROR AL CREAR USUARIO' });
        //        } else {

        //            bcrypt.hash(palabrasecreta, salt, (err, palabrasecretaencriptada) => {
        //                if (err) {
        //                    response.status(500).send({ message: 'ERROR AL CREAR HASH' });
        //                } else {

        //                    response.status(200).send({ message: 'USUARIO CREADO Y HASHEADO EXITOSO ' + palabrasecretaencriptada });

        //                }
        //            });
        //        }

        //    }); 



    } else {

        response.status(400).send({ message: 'Faltan datos de reporte' });
    }

}

function getDepartamento(reques, response) {
    easyConection.query('SELECT * FROM departamento;',
        (error, res) => {
            if (error) {
                throw error;
            } else {
                // response.send(filas)
                response.status(200).send(res);
            }
        });
}

module.exports = {

    newReport,
    newUser,
    getDepartamento
}