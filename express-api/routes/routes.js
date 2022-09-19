const pool = require('../data/config');
const router = app => {
  app.get('/', (request, response) => {
    response.send({
      message: 'Node.js and Express REST API',
    });
  });
  app.get('/users', (request, response) => {
    response.send(users);
  });
};
export default router;
