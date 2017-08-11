var express = require('express');   //create the server handling and listening to servers
var morgan = require('morgan');     //logs
var path = require('path');
var Pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var config = {
    user: 'ajithphilip255',
    database: 'ajithphilip255',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-ajithphilip255-4416'
};

// new Object
// kind of an array

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

var pool = new Pool(config);
app.get('/test-db', function(req, res){
    
    
    pool.query('SELECT * FROM test', function(err, result){
       if(err){
           
           res.status(500).send(err.toString());
       } else{
           
           res.send(JSON.stringify(result.rows));
       }
    });
    
});

//add a counter
var counter=0;

app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});


// submit name button
var names=[];

app.get('/submit-name', function(req,res){    //URL ...app.io/submit-name?name=xxxxx
    
    var name = req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
    
});

// three more articles
// get for aricl-three ust be above the other two ???
app.get('/article-three', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));  
});


app.get('/articles/:articleName', function(req, res){    // : means it will match the part by converting it to a variable  // (express) framework
    
    console.log("In here");
    
    var articleName = req.params.articleName;   //storing :articleName into a var
    
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows === 0){
                res.status(404).send("Article Not Found");
            } else{
                    var articleData = result.rows[0];
                    res.send(createTemplate(articleData));
                }
            
        }
    });
});


//other responses
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

//get the main.js file (client-side js) log in console of the inspect element
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
