const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const api = express.Router();




// ...........   Make a firts user registtration   ........
api.post('/reportes', userController.newReport);
api.post('/login', userLogin.AuthController);


module.exports = api;