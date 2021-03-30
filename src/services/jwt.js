'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'Easy_Access';

exports.createToken = function(user) {
    const payload = {
        user: user.id_user,
        email: user.email,
        password: user.password,
        iat: moment().unix(),
        exp: moment().add(10, 'days').unix
    };
    return jwt.encode(payload, secret);
};