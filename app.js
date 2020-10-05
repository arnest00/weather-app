require('dotenv').config();

const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT + '!');
});