const mysql = require('mysql');
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'td1q2018',
};

const pool = mysql.createPool(config);
console.log(pool)

module.exports = pool;