var express = require('express');   //create the server handling and listening to servers
var morgan = require('morgan');     //logs
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
//var session = require('express-session');

var app = express();
app.use(morgan('combined'));

// app.use(bodyParser.json());
//  app.use(session({
//   secret: 'someRandomSecretValue',
//     cookie: { maxAge: 1000*60*60*24}
//     }));

var config = {
    user: 'ajithphilip255',
    database: 'ajithphilip255',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-ajithphilip255-4416'
};

// new Object
// kind of an array


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
        ${date.toDateString()}
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

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');  //hashed 10000 times
    return ["pbkdf2", "10000",salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res){
   var hashedString = hash(req.params.input, 'some-random-string'); //text: salt so no one can know hash values of specific words
   res.send(hashedString);
});


app.post('/create-user', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);    
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
          if(err){
          res.status(500).send(err.toString());
      } else{
          res.send('User created ' + username);
      }
    });
    
});


app.post('/login', function(req, res){
    
    var username = req.body.username;
    var password = req.body.password;
    
    pool.query('SELECT * from "user" where username = $1', [username], function(err, result){
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows === 0){
              res.send(403).send("username/pass incorrect");
          } else {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              if(hashedPassword === dbString){
                  
                  req.session.auth = {userId: result.rows[0].id};
                  res.send("credentials are right");
                  
                  
                  
              } else{
              res.send(403).send("username/pass incorrect");
                  
              }
          }
      }
    });
    
});

app.get('/check-login', function (req, res) {
  if(req.session && req.session.auth && req.session.auth.userId ){
      res.send('Logged In: ' + req.session.auth.userId.toString() );
  } else{
      res.send('Not logged in');
  }
});

app.get('/logout', function(req, res){
    delete req.session.auth;
    res.send('Logged out');
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

app.get('/login-page', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'login-page.html'));  
});

app.get('/articles/:articleName', function(req, res){    // : means it will match the part by converting it to a variable  // (express) framework
    

    var articleName = req.params.articleName;   //storing :articleName into a var
    
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result){   //prevents users to run sql commands
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

app.get('/ui/login-page.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login-page.js'));
});





// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
