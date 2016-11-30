const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile('/home/madhu/javaScript/ToDo-List' + '/index.html');
});
app.post('/task', function(req, res) {
  console.log(req.body);
});

app.listen(3000, function() {
  console.log("listening to 3000");
});
