"use strict";

var _require = require('../models/reports.models'),
    reports = _require.reports;

var _require2 = require('../models/user.model'),
    usuarios = _require2.usuarios;

var easyConection = require('../database/database');

var bcrypt = require('bcryptjs');

function newReport(request, response) {
  //*request.json({ message: 'this is protected' });
  var params = request.body;
  reports.cuenta = params.cuenta;
  reports.departamento = params.departamento;
  reports.prioridad = params.prioridad;
  reports.reporte = params.reporte; //! reports.multimedia = params.multimedia;

  reports.asunto = params.asunto;
  var query = "CALL setReports (?,?,?,?,?,?);";

  if (reports.cuenta && reports.departamento && reports.prioridad && reports.reporte && reports.asunto) {
    easyConection.query(query, [reports.cuenta, reports.departamento, reports.prioridad, reports.reporte, reports.multimedia, reports.asunto], function (err) {
      if (err) {
        response.status(500).send({
          message: 'NÚMERO DE CUENTA INCORRECTO'
        });
      } else {
        response.status(200).send({
          message: 'REPORTE ENVIADO'
        });
      }
    });
  } else {
    response.status(400).send({
      message: 'Faltan datos de reporte'
    });
  }
}

function newUser(reques, response) {
  var salt = bcrypt.genSaltSync(10);
  var palabrasecreta = usuarios.pass;
  var params = reques.body;
  usuarios.cuenta = params.cuenta;
  usuarios.nombre = params.nombre;
  usuarios.pass = params.pass;
  usuarios.email = params.email;
  var query_saveUser = "CALL setUsers(?,?,?,?);";

  if (usuarios.cuenta && usuarios.nombre && usuarios.pass && usuarios.email) {
    //* ENCRIPTACIÓN DE CONTRASEÑA
    //* usuarios.pass = bcrypt.hashSync(palabrasecreta, salt);
    easyConection.query(query_saveUser, [usuarios.cuenta, usuarios.nombre, usuarios.pass, usuarios.email], function (err) {
      if (err) {
        response.status(500).send({
          message: 'ERROR AL CREAR USUARIO'
        });
      } else {
        response.status(200).send({
          message: 'USUARIO CREADO '
        });
      }
    }); //   easyConection.query(query_saveUser, [usuarios.cuenta, usuarios.nombre, usuarios.pass, usuarios.email], (err) => {
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
    response.status(400).send({
      message: 'Faltan datos de reporte'
    });
  }
}

module.exports = {
  newReport: newReport,
  newUser: newUser
};