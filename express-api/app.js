
import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/routes.js';
const port = 3002;
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

routes(app);
// Start the server
const server = app.listen(port, error => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});

module.exports = pool;

app.get('/brand', (request, response) => {
  pool.query(
    'SELECT MOD_ID, TEX_TEXT AS MOD_CDS_TEXT, MOD_PCON_START, MOD_PCON_END  FROM MODELS INNER JOIN COUNTRY_DESIGNATIONS ON CDS_ID = MOD_CDS_ID INNER JOIN DES_TEXTS ON TEX_ID = CDS_TEX_ID WHERE CDS_LNG_ID = 16;',
    (error, result) => {
      if (error) throw error;

      response.send(result);
    }
  );
});