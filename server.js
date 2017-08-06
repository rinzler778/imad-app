var express = require('express');   //create the server handling and listening to servers
var morgan = require('morgan');     //logs
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//ui/index.html
});

app.get('/article-one', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article-one.html')); 
});

// three more articles

app.get('/article-one', function(req, res){
   res.send('Article one will de served here...'); 
});

app.get('/article-two', function(req, res){
   res.send('Article two will de served here...'); 
});

app.get('/article-three', function(req, res){
   res.send('Article three will de served here...'); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
