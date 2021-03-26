const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/login.controller');
const api = express.Router();




// ...........   Make a firts user registtration   ........
api.post('/reportes', userController.newReport);
api.post('/login', userLogin.newlogin);


module.exports = api;