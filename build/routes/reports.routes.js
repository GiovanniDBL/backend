"use strict";

var express = require('express');

var userController = require('../controllers/reports.controller');

var userLogin = require('../controllers/Auth.controller');

var getTickets = require('../controllers/Tickets.controller');

var _require = require('express'),
    request = _require.request,
    response = _require.response;

var api = express.Router(); //? ...........   RUTAS  ........
//* Crear Reportes

api.post('/reportes', userController.newReport); //* Auth Login

api.post('/login', userLogin.AuthController); //* Crear Nuevos Usuarios *Solo para pruebas

api.post('/', userController.newUser);

function ensureToken(req, res, next) {
  var bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    var bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
} //* Traer todos los reportes a la seccion del panel "Tickets"


api.get('/getReports', getTickets.TraerTickets); //* Traer todos los reportes a la seccion del panel "Tickets"

api.get('/getReports/:departamento', getTickets.TraerTickets); //* Filtrar los reportes a la seccion del panel "Tickets"

api.get('/verTickets/:id_reporte', getTickets.VerTickets); //* Eliminar tickets del panel

api["delete"]('/deleteReports/:id', getTickets.EliminarTickets);
module.exports = api;