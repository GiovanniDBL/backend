const easyConection = require('../database/database');
const { request } = require('http');
const { send } = require('process');

function TraerTickets(request, response) {

    // let query_all_tickets = `CALL getReports();`;
    // easyConection.query(query_all_tickets, (err, rows) => {
    //     if (err) {
    //         response.status(500).send({ message: 'SYSTEM FAILURE' });
    //     } else {

    //         let data = JSON.parse(JSON.stringify(rows[0]));
    //         response.status(200).send({ results: data });

    //     }
    // });

    //* MOSTRAR TODOS LOS TICKETS
    easyConection.query('SELECT * FROM reportes', (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas)
        }
    })

}


module.exports = {
    TraerTickets
}