const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config')
const { Client } = require('pg')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//quote api request
const fetchquotes = require('node-fetch');
let quotesUrl = "https://zenquotes.io/api/random";
let quotesGet = {method: "Get"};
let quote = {};
fetchquotes(quotesUrl, quotesGet).
then(res => res.json()).
then((json) => {
  quote = json[0];
})

app.get('/api/zenquote', (req, res) => {
  res.send({ quote });
});

app.get('/api/users', (req, res) => {
const client = new Client(config.prod)
client.connect()
client.query('SELECT * FROM AppUser', (err, dbres) => {
  res.send(dbres.rows[0].firstname)
  client.end()
})
});

app.listen(port, () => console.log(`Listening on port ${port}`));