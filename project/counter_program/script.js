const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const resetBtn = document.getElementById('resetBtn');
const countDisplay = document.getElementById('countLabel');

let count = 0;

increaseButton.onclick = function(){
    count++;
    countDisplay.textContent = count;
}

decreaseButton.onclick = function(){
    count--;
    countDisplay.textContent = count;
}

resetBtn.onclick = function(){
    count = 0;
    countDisplay.textContent = count;
}