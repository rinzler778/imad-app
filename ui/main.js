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
    
    //make request to counter end point
    
    //capture the respnse and store it in a variable
    
    //render thevariable in the correct span
    
    counter = counter +1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
    
}
