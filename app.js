require('dotenv').config();

const express = require('express'),
      { getForecast } = require('./forecast');

const app = express();

// ============ Set up .env variables
const PORT = process.env.PORT || 3000;

// ============ EJS
app.set('view engine', 'ejs');

// ============ Other middleware
app.use(express.static('public'));

// ============ App route
app.get('/', (req, res) => {
  res.render('index.ejs', { });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});