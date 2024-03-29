"use strict";

var mysql = require('mysql');

var _require = require('util'),
    promisify = _require.promisify;

var _require2 = require('./keys'),
    database = _require2.database;

var pool = mysql.createPool(database);
pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed ' + err);
    }

    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connection ' + err);
    }

    if (err.code === 'ECONNREFUSED') {
      console.error('database connection was refused ' + err);
    }

    console.log(' Error serve DB -> ' + err);
  }

  if (connection) {
    connection.release();
    console.log('Database is connected ...');
    return;
  }
}); // *** promisify pool Querys

pool.query = promisify(pool.query);
module.exports = pool;