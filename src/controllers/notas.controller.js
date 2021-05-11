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

    connection.query('SELECT * FROM notas INNER JOIN reportes  ON reportes.id_reporte = notas.id_reporte WHERE reportes.id_reporte = ?', [request.params.id_reporte], (error, filas) => {
        if (error) {
            throw error;
        } else {
            response.send(filas)
        }
    });

}
module.exports = {
    CrearNota,
    TraerNotas
}