console.log('Loaded!');

/*//change main text in index.html
var element = document.getElementById('mainText');
element.innerHTML = 'New Value from main.js';

//move image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft += 5;
    img.style.marginLeft = marginLeft + 'px';   //concatenating
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50); //every 100ms call moveRight
};*/


//update counter text
var button = document.getElementById('counterB');

button.onclick = function (){
    
    //create a request object to counter end point
    var request = new XMLHttpRequest();
    
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){

          if(request.status === 200){    //request completed
              var counter = request.responseText;   //extract value from request ie send from server.js

              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      //not DONE yet
    };
    
    
    //make the request
    request.open('GET', 'http://ajithphilip255.imad.hasura-app.io/counter', true);
    request.send(null);
    
};

//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

submit.onclick = function(){
  
    var request = new XMLHttpRequest();      //create a request object to counter end point
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        
      if(request.readyState === XMLHttpRequest.DONE){

          if(request.status === 200){    //request completed
          
            var names = request.resposeText;
            names = JSON.parse(names);  //convert JSON to array
            var list = '';
            for(var i =0; i< names.length; i++){
                list += '<li>' + names[i] + '</li>';
            }
            var ui = document.getElementById('nameList');
            ul.innerHTML = list;
            
          }
      }//not DONE yet
    };
    
    
    //make the request
    request.open('GET', 'http://ajithphilip255.imad.hasura-app.io/submit-name?name='+ name , true);
    request.send(null);
    
};













