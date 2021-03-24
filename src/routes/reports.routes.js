const express = require('express');
const userController = require('../controllers/reports.controller');
const login = require('../controllers/login.controller');
const api = express.Router();
const { body } = require('express-validator');



// ...........   Make a firts user registtration   ........
api.post('/reportes', userController.newReport);

module.exports = api;