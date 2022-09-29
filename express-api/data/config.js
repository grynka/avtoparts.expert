const mysql = require('mysql');
const config = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'td1q2018',
};

const pool = mysql.createPool(config);

module.exports = pool;