const express = require('express');
const api = express.Router();
const pool = require('../database/database');


api.post('/login', (req, res) => {
    console.log('recived');
})

module.exports = api;