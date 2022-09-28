const mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tecdoc',
};

const pool = mysql.createPool(config);
console.log(pool)

module.exports = pool;