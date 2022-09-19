// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

    // Display all users
    app.get('/brands', (request, response) => {
        pool.query('SELECT MFA_ID, MFA_BRAND, MFA_MFC_CODE, MFA_PC_MFC, MFA_CV_MFC FROM MANUFACTURERS ORDER BY MFA_BRAND ASC', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/brands/:id', (request, response) => {
      const id = request.params.id;

      pool.query(
        'SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END FROM MODELS INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID  WHERE MOD_MFA_ID =  ?  AND CDS_LNG_ID = 16',
        id,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        }
      );
    });

    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
