console.log('Loaded!');

//change main text in index.html
var element = document.getElementById('mainText');
element.innerHTML = 'New Value from main.js';

//move image
var img = document.getElementById('madi');
img.onClick = function(){
    img.style.marginLeft = '100px';
};


