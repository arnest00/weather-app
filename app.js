require('dotenv').config();

const express = require('express');

const app = express();

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', {
    API_KEY
  });
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});