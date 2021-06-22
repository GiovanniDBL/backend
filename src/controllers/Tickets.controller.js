const easyConection = require('../database/database');
const { request } = require('http');
const { send } = require('process');

//* FUNCIÓN MOSTRAR TODOS LOS TICKETS EN EL PANEL ****
function TraerTickets(request, response) {


    easyConection.query('SELECT T.id_ticket, U.nombre, D.departamento, T.prioridad, T.reporte, T.asunto, T.multimedia, T.created_report from tickets T INNER JOIN usuario U ON T.usuario = U.id_usuario INNER JOIN departamento D ON T.departamento = D.id_departamento;',
        (error, filas) => {
            if (error) {
                throw error;
            } else {
                response.send(filas)
            }
        });

    // SELECT * FROM usuario INNER JOIN tickets ON tickets.usuario = usuario.id_usuario INNER JOIN departamento ON tickets.departamento = departamento.id_departamento;

}
//* FUNCIÓN MOSTRAR TICKET POR ID ****
function VerTickets(request, response) {

    easyConection.query('SELECT * FROM usuario INNER JOIN tickets ON tickets.usuario = usuario.id_usuario WHERE id_ticket = ?; ', [request.params.id_reporte], (error, fila) => {
        if (error) {
            throw error;
        } else {
            response.send(fila)
        }
    });


}

//* FUNCIÓN ELIMINAR TICKETS DEL PANEL ****
function EliminarTickets(request, response) {

    easyConection.query('DELETE FROM tickets WHERE id_ticket = ?', [request.params.id], function(error, filas) {

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