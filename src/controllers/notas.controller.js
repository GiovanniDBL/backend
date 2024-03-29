const connection = require('../database/db');
const { notasPanel } = require('../models/notas.models');

function CrearNota(request, response) {
    const params = request.body;

    notasPanel.nombre = params.nombre;
    notasPanel.id_reporte = params.id_reporte;
    notasPanel.nota = params.nota;

    let query_notas = `CALL setnotas (?,?,?);`;

    if (notasPanel.nota && notasPanel.id_reporte && notasPanel.nota) {

        connection.query(query_notas, [notasPanel.nombre, notasPanel.id_reporte, notasPanel.nota], (err) => {


            if (err) {
                response.status(500).send({ message: 'ERROR AL CREAR LA NOTA' });
            } else {

                response.status(200).send({ message: 'NOTA CREADA CORRECTAMENTE' });
            }


        });
    } else {

        response.status(400).send({ message: 'FALTAN DATOS EN LA NOTA' });
    }



}

function TraerNotas(request, response) {

    connection.query('SELECT * FROM notas INNER JOIN tickets ON tickets.id_ticket = notas.id_ticket WHERE tickets.id_ticket = ?;', [request.params.id_reporte], (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas)
        }
    });

}

function EliminarNotas(request, response) {


    connection.query('DELETE FROM notas WHERE id_nota = ?', [request.params.id], function(error, filas) {

        if (error) {
            throw error;
        } else {

            // response.send(filas)
            response.status(200).send({ message: 'NOTA ELIMINADA CORRECTAMENTE' });
            console.log('NOTA ELIMINADA CORRECTAMENTE');
        }
    })
}
module.exports = {
    CrearNota,
    TraerNotas,
    EliminarNotas
}