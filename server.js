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

app.post('/login', (req, res) =>{
  let email = req.body.email
  let password = req.body.password
  let newUser = req.body.newUser

  const client = new Client(config.prod)
  client.connect()

  if(!newUser){
    client.query('SELECT * FROM AppUser Where email = \'' + email + '\' and password = \''+password+'\'', (err, dbres) => {
      if(dbres.rowCount > 0){
        res.send({id: dbres.rows[0].appuserid, name: dbres.rows[0].firstname})
        console.log("Success")
      } else if(dbres.rowCount === 0){
          res.send("UserName and/or Password are incorrect. Please try again")
      } else if(err){
          res.send(err)
          console.log(err)
      }
    client.end();
    })
  } else if(newUser){
      client.query('Insert into Appuser (email,password) values (\'' + email + '\', \'' + password + '\');', (err, dbres) =>{
        res.send("Thanks for Signing Up!")
        console.log(dbres)
        client.end();
      })
    } 
});

app.listen(port, () => console.log(`Listening on port ${port}`));