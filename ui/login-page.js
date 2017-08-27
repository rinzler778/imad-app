console.log("Login Page");


//submit login

var submit = document.getElementById('submit_btn');

submit.onclick = function(){
  
    var request = new XMLHttpRequest();      
    
    
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){

          if(request.status === 200){    
          
            console.log("user logged in");
            alert("logged in successfully");
            
          } else if(request.status === 403){
              alert("username/password incorrect");
          }else /*if(request.status === 500)*/{
              alert("something went wrong");
          }
      }//not DONE yet
    };
    
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
    //make the request
    request.open('POST', 'http://ajithphilip255.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
    request.open('GET', 'http://ajithphilip255.imad.hasura-app.io/', true);
    
};
