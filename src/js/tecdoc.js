var Connection = require('tedious').Connection;
var config = {
  server: 'localhost', //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'root', //update me
      password: '', //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
   // encrypt: true,
    database: 'td1q2018', //update me
  },
};
var connection = new Connection(config);
connection.on('connect', function (err) {
  // If no error, then good to proceed.
  console.log('Connected');
  executeStatement();
});
