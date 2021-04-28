const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const getTickets = require('../controllers/Tickets.controller');
const { request, response } = require('express');
const api = express.Router();






//? ...........   RUTAS  ........

//* Crear Reportes
api.post('/reportes', userController.newReport);
//* Auth Login
api.post('/login', userLogin.AuthController);
//* Crear Nuevos Usuarios *Solo para pruebas
api.post('/', userController.newUser);

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports', getTickets.TraerTickets);
//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports/:departamento', getTickets.TraerTickets);
//* Filtrar los reportes a la seccion del panel "Tickets"
api.get('/verTickets/:id_reporte', getTickets.VerTickets);
//* Eliminar tickets del panel
api.delete('/deleteReports/:id', getTickets.EliminarTickets);

//? ...........   RUTAS LOGIN AUTHENTIATION PANEL EASYACCESS  ........

api.post('/signup')
api.post('/signin')


module.exports = api;