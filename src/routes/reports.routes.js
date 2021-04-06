const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const { request, response } = require('express');
const api = express.Router();
const jwt = require('jsonwebtoken');





//? ...........   Make a firts user registtration   ........

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

module.exports = api;