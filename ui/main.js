console.log('Loaded!');

//change main text in index.html
var element = document.getElementById('mainText');
element.innerHTML = 'New Value from main.js';

//move image
var img = document.getElementById('madi');
function moveRight(){
    marginLeft += 10;
    img.style.marginLeft = marginLeft + 'px';   //concatenating
}
img.onclick = function(){
    var interval = setInterval(moveRight, 100); //every 100ms call moveRight
};


