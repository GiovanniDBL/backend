const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const getTickets = require('../controllers/Tickets.controller');
const Notas = require('../controllers/notas.controller');
const { request, response } = require('express');
const api = express.Router();






//? ...........   RUTAS  ........

//* Crear Reportes
api.post('/reportes', userController.newReport);
//* Auth Login
api.post('/login', userLogin.AuthController);
//* Crear Nuevos Usuarios *Solo para pruebas
api.post('/', userController.newUser);
// *Traer todos los departamentos existentes
api.get('/departamento', userController.getDepartamento)

//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports', getTickets.TraerTickets);
//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports/:departamento', getTickets.TraerTickets);
//* Filtrar los reportes a la seccion del panel "Tickets"
api.get('/verTickets/:id_reporte', getTickets.VerTickets);
//* Eliminar tickets del panel
api.delete('/deleteReports/:id', getTickets.EliminarTickets);

//? ...........   RUTAS LOGIN AUTHENTIATION PANEL EASYACCESS  ........

api.post('/register', userLogin.NuevoUsuario);
api.post('/loginpanel', userLogin.LoginPanel);

//? RUTA CREAR NOTA PARA REPORTES DEL PANEL .............
api.post('/CrearNota', Notas.CrearNota);
api.get('/TraerNotas/:id_reporte', Notas.TraerNotas);
api.delete('/EliminarNota/:id', Notas.EliminarNotas)


module.exports = api;