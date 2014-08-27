var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

app.get('/', function(req,res) {
  res.send('get okay');
});

app.post('/', function(req,res) {
  res.json(req.body);
});

app.put('/', function(req, res) {
  res.json(req.body);
});

app.patch('/', function(req, res) {
  res.json(req.body);
});

app.delete('/', function(req, res) {
  res.send('delete okay');
});

var server = http.createServer(app);
server.listen(3000);
