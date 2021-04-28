"use strict";

var _require = require('../models/login.models'),
    loginUsers = _require.loginUsers;

var easyConection = require('../database/database');

var _require2 = require('http'),
    request = _require2.request;

var _require3 = require('process'),
    send = _require3.send;

var bcrypt = require('bcryptjs');

var _require4 = require('../models/user.model'),
    usuarios = _require4.usuarios;

var jwt = require('jsonwebtoken'); //* DECLARE JWT-secret


var JWT_Secret = 'Dany_Bl98';

function AuthController(request, response) {
  var token = jwt.sign({
    loginUsers: loginUsers
  }, 'my_secret_key');
  var params = request.body;
  loginUsers.cuenta = params.cuenta;
  loginUsers.pass = params.pass;
  loginUsers.nombre = params.nombre;
  var query_verify = "CALL getUsers(?,?,?);";

  if (loginUsers.cuenta && loginUsers.nombre && loginUsers.pass) {
    easyConection.query(query_verify, [loginUsers.cuenta, loginUsers.nombre, loginUsers.pass], function (err, rows) {
      if (err) {
        response.status(500).send({
          message: 'NÚMERO DE CUENTA INCORRECTO'
        });
      } else {
        var result = JSON.parse(JSON.stringify(rows[0]));

        if (JSON.stringify(result) == '[]') {
          response.status(404).send({
            message: 'EL USUARIO NO EXISTE'
          });
        } else {
          response.status(200).send({
            message: "EL USUARIO ".concat(loginUsers.nombre, " SI EXISTE"),
            token: token
          });
        } // response.status(200).send({ message: 'USUARIO CORRECTO' });

      }
    });
  } else {
    response.status(400).send({
      message: 'Faltan datos de usuario'
    });
  }
}

module.exports = {
  AuthController: AuthController
};