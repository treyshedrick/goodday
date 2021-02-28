const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const config = require('./config')
const { Client } = require('pg')
const bcrypt = require('bcrypt')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//quote api request
const fetchquotes = require('node-fetch');
const e = require('express');
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

app.post('/api/update/name', (req, res) =>{
  const client = new Client(config.prod)
  client.connect()

  client.query('Update appuser set firstname = \'' + req.body.name +'\' where appuserid = ' + req.body.id + ';', (err, dbres) =>{
    res.send("Success");
    client.end();
  })
})

app.post('/api/login', (req, res) =>{
  let email = req.body.email
  let password = req.body.password
  let newUser = req.body.newUser

  const client = new Client(config.prod)
  client.connect()

  if(!newUser){
    client.query('SELECT * FROM AppUser Where email = \'' + email + '\';', (err, dbres) => {
      if(dbres.rowCount > 0){
        bcrypt.compare(password, dbres.rows[0].password)
        .then(function(result) {
          if(result){
            res.send({id: dbres.rows[0].appuserid, name: dbres.rows[0].firstname})
          } else{
            res.send({id: -1})
          }
        })
        .catch(err => {
          console.log(err)
        });

      } else if(dbres.rowCount === 0){
          res.send({id: -1})
      } else if(err){
          res.send(err)
          console.log(err)
      }

      client.end();
    })

  } else if(newUser){
      bcrypt.hash(password, 10)
      .then(function(hash) {
        client.query('Insert into Appuser (email,password) values (\'' + email + '\', \'' + hash + '\') Returning *;', (err, dbres) =>{
          if(!err){
            res.send({id: dbres.rows[0].appuserid})
          } else {
            res.send({id: -2, error: err})
          }
          client.end();
        })
      })
      .catch(err =>{
        console.log(err)
      });
    }
});

app.post('/api/post', (req,res) =>{
  const client = new Client(config.prod)
  client.connect()

  client.query('Insert into appuserpost (appuserid, post) values (' + req.body.id + ', \'' + req.body.post + '\');', (err, dbres) =>{
    if(!err){
      res.send("Alway's Think Positive!")
    } else if(err){
      res.send(err)
    }
  })
})

app.post('/api/postedtoday', (req,res) =>{
  const client = new Client(config.prod)
  client.connect()

  let usertable = ""
  let positiveresponse = ""
  if(req.body.task === undefined)
  {
    usertable = "appuserpost"
    positiveresponse = "Always Think Positive. Thanks for posting today!"
  } else{
    usertable = "appusertask"
    positiveresponse = "Make sure to complete your task!"
  }

  client.query('select * from ' + usertable + ' where date(current_timestamp) = date(dateposted) and appuserid =' + req.body.id + ';', (err, dbres) =>{
    if(!err){
      if(dbres.rowCount === 1){
        let id = usertable+"id"
        if(id === "appusertaskid"){
          res.send({didPost: true, positiveresponse: positiveresponse, id: dbres.rows[0][id], completed: dbres.rows[0].completed, task: dbres.rows[0].task})
        } else{
          res.send({didPost: true, positiveresponse: positiveresponse, id: dbres.rows[0][id]})
        }
        
      } else{
        res.send(false)
      }
    } else if(err){
      console.log(err)
    }
  })
})

app.post('/api/task', (req,res) =>{
  const client = new Client(config.prod)
  client.connect()

  client.query('Insert into appusertask (appuserid, task) values (' + req.body.id + ', \'' + req.body.task + '\') returning appusertaskid;', (err, dbres) =>{
    if(!err){
      res.send({taskresponse: "Make sure to complete your task!", id: dbres.rows[0].appusertaskid})
    } else if(err){
      res.send(err)
    }
  })
})

app.post('/api/updatetask', (req,res) =>{
  const client = new Client(config.prod)
  client.connect()

  client.query('update appusertask set completed = \'1\' where appusertaskid = ' + req.body.taskid + ';', (err,dbres) =>{
    if(!err){
      res.send(true)
    } else{
      res.send(err)
    }
  })
})

app.get('/api/userposts', (req,res) =>{
  const client = new Client(config.prod)
  client.connect()

  client.query('select a.firstname, p.post, dateposted from appuserpost p join appuser a on a.appuserid  = p.appuserid where p.dateposted > (current_date - 7) order by p.dateposted desc limit 9;', (err,dbres)=>{
    if(!err){
      res.send(dbres.rows);
    } else{
      res.send(err);
    }
  })

})

app.listen(port, () => console.log(`Listening on port ${port}`));