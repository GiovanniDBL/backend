const connection = require('../database/db');
const { notasPanel } = require('../models/notas.models');

function CrearNota(request, response) {
    const params = request.body;

    notasPanel.nombre = params.nombre;
    notasPanel.cuenta = params.cuenta;
    notasPanel.nota = params.nota;

    let query_notas = `CALL setnotas (?,?,?);`;

    if (notasPanel.nota && notasPanel.cuenta && notasPanel.nota) {

        connection.query(query_notas, [notasPanel.nombre, notasPanel.cuenta, notasPanel.nota], (err) => {


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

module.exports = {
    CrearNota
}