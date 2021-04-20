const easyConection = require('../database/database');
const { request } = require('http');
const { send } = require('process');

//* FUNCIÓN MOSTRAR TODOS LOS TICKETS EN EL PANEL ****
function TraerTickets(request, response) {


    easyConection.query('SELECT * FROM usuarios INNER JOIN reportes ON reportes.cuenta = usuarios.cuenta', (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas)
        }
    });



}
//* FUNCIÓN MOSTRAR TICKET POR ID ****
function VerTickets(request, response) {

    easyConection.query('SELECT * FROM usuarios INNER JOIN reportes ON reportes.cuenta = usuarios.cuenta WHERE id_reporte = ?  ', [request.params.id_reporte], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila)
        }
    });


}

//* FUNCIÓN ELIMINAR TICKETS DEL PANEL ****
function EliminarTickets(request, response) {

    easyConection.query('DELETE FROM reportes WHERE id_reporte = ?', [request.params.id], function(error, filas) {

        if (error) {
            throw error;
        } else {

            response.send(filas)
        }
    })
}


module.exports = {
    TraerTickets,
    VerTickets,
    EliminarTickets
}