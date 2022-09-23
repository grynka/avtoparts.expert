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

    app.get('/brands/:id', (request, response) => {
    const id = request.params.id;
      pool.query(
        `SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END FROM MODELS INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID  WHERE MOD_MFA_ID =  ${id}  AND CDS_LNG_ID = 16`,
        id,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        }
      );
    });


    // Display all users
    app.get('/brands', (request, response) => {
        pool.query('SELECT MFA_ID, MFA_BRAND, MFA_MFC_CODE, MFA_PC_MFC, MFA_CV_MFC FROM MANUFACTURERS ORDER BY MFA_BRAND ASC', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/brands/:id/:year', (request, response) => {
        const id = request.params.id;
        const year = request.params.year * 100;

      pool.query(
        `SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END FROM MODELS INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID  WHERE MOD_MFA_ID =  ${id}  AND CDS_LNG_ID = 16 AND MOD_PCON_START <= ${year} AND MOD_PCON_END >= ${year}`,
        id,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        },

        year,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        }
      );
    });

    app.get('/types/:type/:year', (request, response) => {
      const type = request.params.type;
       const year = request.params.year * 100;
      pool.query(
        `SELECT TYP_ID, DES_TEXTS.TEX_TEXT AS TYP_CDS_TEXT FROM TYPES INNER JOIN COUNTRY_DESIGNATIONS ON COUNTRY_DESIGNATIONS.CDS_ID = TYP_CDS_ID AND COUNTRY_DESIGNATIONS.CDS_LNG_ID = 16 INNER JOIN DES_TEXTS ON DES_TEXTS.TEX_ID = COUNTRY_DESIGNATIONS.CDS_TEX_ID WHERE TYP_MOD_ID = ${type}  AND TYP_PCON_START <= ${year} AND TYP_PCON_END >= ${year}`,
        type,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        },
         year,
        (error, result) => {
          if (error) throw error;

          response.send(result);
        }
      );
    });

  
}

// Export the router
module.exports = router;
