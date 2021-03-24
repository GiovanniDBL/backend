const { loginUsers } = require('../models/login.models');
const easyConection = require('../database/database');

function login(request, response) {

    const params = request.body;

    loginUsers.cuenta = params.cuenta;
    loginUsers.pass = params.pass;



}