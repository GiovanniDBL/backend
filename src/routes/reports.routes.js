const express = require('express');
const userController = require('../controllers/reports.controller');
const api = express.Router();


// ...........   Make a firts user registtration   ........
api.post('/reportes', userController.newReport);

module.exports = api;