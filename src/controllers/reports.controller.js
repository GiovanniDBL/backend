const { reports } = require('../models/reports.models');
const easyConection = require('../database/database');


function newReport(request, response) {

    reports.cuenta = params.cuenta;
    reports.departamento = params.departamento;
    reports.prioridad = params.prioridad;
    reports.reporte = params.reporte;
    reports.multimedia = params.multimedia;
    reports.asunto = params.asunto;


    let query = `CALL setReports(?,?,?,?,?,?);`;

    if (reports.cuenta && reports.departamento && reports.prioridad && reports.reporte && reports.multimedia && reports.asunto) {




        easyConection.query(query, [reports.cuenta, reports.departamento, reports.prioridad, reports.reporte, reports.multimedia, reports.asunto], (err) => {


            if (err) {
                response.status(500).send({ message: 'ERROR SERVIDOR' });
            } else {
                response.status(200).send({ message: 'REPORTE ENVIADO' });
            }


        });



    } else {

        response.status(400).send({ message: 'Faltan datos de reporte' });
    }

}

module.exports = {


    newReport
}