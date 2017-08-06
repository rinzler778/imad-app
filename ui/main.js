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
var counter = 0;

button.onclick = function (){
    
    //create a request object to counter end point
    var request = new XMLHttpRequest();
    
    
    //capture the respnse and store it in a variable
    request.onreadystatechange = function(){
      if(request.readystate === XMLHttpRequest.DONE){
          //take some action
          if(request.status === 200){    //request completed
              var counter = request.responseText;   //extract value from request
              //render the variable in the correct span
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
















