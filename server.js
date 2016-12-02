const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  mongo.connect('mongodb://localhost:27017/test', function(err, db) {
    db.collection('ToDo').find().toArray(function(err, result) {
      if(err)
      console.log(err);
      res.render('index', {todo: result});
    });
  });
});

app.post('/task', function(req, res) {
  var list = req.body;
  mongo.connect('mongodb://localhost:27017/test', function(err, db) {
    db.collection('ToDo').insert(list, function(err, result) {
      console.log('item inserted');
    });
  });
  res.redirect('/');
});

app.listen(3000, function () {
    console.log("listening to 3000");
});
