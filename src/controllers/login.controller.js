const { loginUsers } = require('../models/login.models');
const easyConection = require('../database/database');

function newlogin(request, response) {

    response.send('receiver');
    const params = request.body;

    loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;

    let query = `CALL setReports(?,?,?,?,?,?);`;

    if (reports.cuenta && reports.departamento && reports.prioridad && reports.reporte && reports.asunto) {




        easyConection.query(query, [reports.cuenta, reports.departamento, reports.prioridad, reports.reporte, reports.multimedia, reports.asunto], (err) => {


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

module.exports = {
    newlogin
}