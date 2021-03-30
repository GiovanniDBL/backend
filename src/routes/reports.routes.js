const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const { request, response } = require('express');
const api = express.Router();





// ...........   Make a firts user registtration   ........

// Crear Reportes
api.post('/reportes', userController.newReport);
// Auth Login
api.post('/login', userLogin.AuthController);
// Crear Nuevos Usuarios *Solo para pruebas
api.post('/', userController.newUser);


module.exports = api;