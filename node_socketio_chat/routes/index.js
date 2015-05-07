var express = require('express');
var router = express.Router();

//var app =express();
//var http = require('http');
//var server = http.createServer(app);
//var io = require('socket.io').listen(server);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//server.listen(app.get('port'), function(){
//  console.log("Express server listening on port " +  app.get('port'));
//});
//
//io.on('connection', function(socket){
//  console.log('a user connected');
//});
//io.on('connection', function(socket){
//  console.log('a user connected');
//  socket.on('disconnect', function(){
//    console.log('user disconnected');
//  });
//});

//var app = require('express')();
//var http = require('http').createServer(app);
//var io = require('socket.io').listen(http);
//
//app.get('/', function(req, res){
//  res.sendFile('index.ejs');
//});
//
//
//io.on('connection', function(socket){
//  console.log('a user connected');
//  socket.on('chat message', function(msg){
//    io.emit('chat message', msg);
//  });
//});
module.exports = router;
