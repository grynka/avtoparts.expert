// Load the MySQL pool connection
const pool = require('../data/config');
const cors = require('cors');

// Route the app
const routes = app => {
  // Display welcome message on the root
  app.get('/', (request, response) => {
    response.send({
      message: 'Welcome to the Node.js Express REST API!',
    });
  });

  // Display all manufacturer
  app.get('/makes', (request, response) => {
    pool.query(`SELECT id, description FROM manufacturers WHERE canbedisplayed = 'True' AND ispassengercar = 'True' AND iscommercialvehicle = 'False' ORDER BY description `
    ,
      (error, result) => {
        if (error) throw error;

        response.send(result);
      }
    );
  });

    // Display all model by id manufacturer
  app.get('/makes/:id', (request, response) => {
    const id = request.params.id;

    pool.query(`SELECT id, description name, constructioninterval FROM models WHERE canbedisplayed = 'True'
    AND manufacturerid = ${id} AND ispassengercar = 'True'
    ORDER BY description`, id, (error, result) => {
      if (error) throw error;

      response.send(result);
    });
  });

      // Display all types by id model
      app.get('/types/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query(`SELECT id, fulldescription name
        FROM passanger_cars pc 
        WHERE canbedisplayed = 'True'
        AND modelid = ${id} AND ispassengercar = 'True'`, id, (error, result) => {
          if (error) throw error;
    
          response.send(result);
        });
      });
    
      app.get('/engine/:id', (request, response) => {
        const id = request.params.id;
    
        pool.query(`SELECT id, fulldescription name FROM passanger_cars pc 
        WHERE 
   id = ${id} AND ispassengercar = 'True'`, id, (error, result) => {
          if (error) throw error;
    
          response.send(result);
        });
      });

    app.get('/brands', (request, response) => {
      pool.query(
        `SELECT id,FROM manufacturers`,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        }
      );
    });
  
  

  // Update an existing user
  app.put('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query(
      'UPDATE users SET ? WHERE id = ?',
      [request.body, id],
      (error, result) => {
        if (error) throw error;

        response.send('User updated successfully.');
      }
    );
  });

  // Delete a user
  app.delete('/users/:id', (request, response) => {
    const id = request.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      response.send('User deleted.');
    });
  });
};

// Export the router
module.exports = routes;
