const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectId;
const pug = require('pug');
const app = express();
// const rout = express.Router();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
      console.log("Item Inserted");
    });
  });
  res.redirect('/');
});

app.post('/update', function(req, res) {
  var id = req.body.id;
  var item = req.body.Do;
  mongo.connect('mongodb://localhost:27017/test', function(err, db) {
    db.collection('ToDo').update({'_id': objectId(id)}, {$set: {'Do': item}}, function(err, result) {
      console.log("Item Updated");
      console.log(id+" "+item);
    });
  });
  res.redirect('/');
});

app.post('/delete', function(req, res) {
  var id = req.body.id;
  mongo.connect('mongodb://localhost:27017/test', function(err, db) {
    db.collection('ToDo').remove({'_id': objectId(id)}, function(err, result) {
      console.log("Item Deleted");
    });
  });
  res.redirect('/');
});

app.listen(3000, function () {
    console.log("listening to 3000");
});
