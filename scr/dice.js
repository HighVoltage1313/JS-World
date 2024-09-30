const dice = document.querySelector('.dice');
const diceOut = document.querySelector('.dice > p');
const dicePoints = document.querySelectorAll('.dice__point');
let number = 6;

const diceNumbers = [
['d5'],
['d2', 'd8'],
['d2', 'd5', 'd8'],
['d1', 'd3', 'd7', 'd9'],
['d1', 'd3', 'd5', 'd7', 'd9'],
['d1', 'd3', 'd4', 'd6', 'd7', 'd9']
];

function randomize(min, max) {
    number = Math.floor(Math.random() * (max - min + 1) + min);
}

dice.addEventListener('click', () => {
    number = 5;
    dice.classList.add('dice-roll');  
    diceOut.textContent = '';    
    changeNumber(number - 1);   
});

dice.addEventListener('animationend', () => {  
    randomize(1, 6);
    changeNumber(number - 1);  
    dice.classList.remove('dice-roll');
});

function changeNumber(value) {
    dicePoints.forEach((e) => {
        if (diceNumbers[value].some(className => e.classList.contains(className))) {            
            e.style.display = 'block'; 
        } else {
            e.style.display = 'none';  
        }      
    });   
}

changeNumber(5);  

