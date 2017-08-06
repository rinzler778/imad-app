var express = require('express');   //create the server handling and listening to servers
var morgan = require('morgan');     //logs
var path = require('path');

var app = express();
app.use(morgan('combined'));

//2 New Objects

var articles = {
    
    'article-one': {
    title: 'Article-One | Aiden Pearce',
    heading:'Article - One',
    date: 'Aug 6, 2017',
    content:`
        <p>
            This is the content for my first article...
        </p>
       <p>
            Content for this Article. Content for this Article. Content for this Article. 
            Content for this Article. Content for this Article. Content for this Article. 
            Content for this Article. Content for this Article. Content for this Article.
        </p>
        <p>
            Content for this Article.Content for this Article.Content for this Article.Content for this Article.
            Content for this Article.Content for this Article.Content for this Article.Content for this Article.
            Content for this Article.Content for this Article.Content for this Article.Content for this Article.
        </p>`
},

    'article-two': {
    title: 'Article-Two | Aiden Pearce',
    heading:'Article - Two',
    date: 'Aug 6, 2017',
    content:`
        <p>
            This is the content for my Second article...
        </p>
       <p>
            Content for this Article. Content for this Article. Content for this Article. p1
        </p>`
    }

};

//funct to return html data (not a file)
function createTemplate (data){
    
    var title =  data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
var htmlTemplate=`

<html>

<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
</head>

<body>
<div class="container">
    
    <div>
        <a href="/">Home</a>
    </div>
    <hr/>    
    
    <h3>
        ${heading}
    </h3>
    <div>
        ${date}
    </div>
    <div>
        ${content}
    </div>
    
 </div>
</body>

</html>

`;

return htmlTemplate;

}


//Pages or URL

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//ui/index.html
});

// three more articles

app.get('/:articleName', function(req, res){    // : means it will match the part by converting it to a variable  // (express) framework
   res.send(createTemplate(articles[articleName]));     // sends  articles[recieved request] from articles object
});



app.get('/article-three', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));  
});

//other responses
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
