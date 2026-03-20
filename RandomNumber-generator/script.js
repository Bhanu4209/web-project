const mybutton = document.getElementById('generate-btn');
const result = document.getElementById('result');
const min = 1;
const max = 100;
let randomNumber;

mybutton.addEventListener('click',() => {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    result.textContent = randomNumber;
})