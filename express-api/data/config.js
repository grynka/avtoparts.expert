const mysql = require('mysql');
const config = {
  host: 'localhost:3002',
  user: 'root',
  password: '',
  database: 'tecdoc',
};

const pool = mysql.createPool(config);

module.exports = pool;