const numberGame = document.querySelector('.numGuessing');
const grid = document.querySelector('.gridNumGame');

let defaultCells = 25;
let col = '5';
let row = '5';

let secretCode = [];
let cellArr = [];

let gameStatus = '0'; // 0 - Ended, 1 - Started
let gameResult = ''; // 0 - Lose, 1 - Win

gameParam();

function gameStarting() { 

  for (let i = 0; i < defaultCells; i++) {
      const numberCell = document.createElement('input');
      document.querySelector('.gridNumGame').style.gridTemplateColumns  = `repeat(${col}, 1fr)`;
      numberCell.className = 'numCell nC-' + i;
      numberCell.setAttribute('maxlength', '1');
      grid.appendChild(numberCell); 

      numberCell.onkeydown = (event) => {
          // Only allow if the e.key value is a number or if it's 'Backspace'
          if(isNaN(event.key) && event.key !== 'Backspace') {
            event.preventDefault();
          }
      };
  }
}

function removeCells() {
  const getCells = document.querySelectorAll('.numCell')
  getCells.forEach((element) =>{
    element.remove();
  });

  console.log('Cells Removed');
}

function removeElement(elementToRemove) {
  const getElement = document.querySelectorAll(elementToRemove)
  getElement.forEach((element) =>{
    element.remove();
  });
}

function createNewElement(newTag, newParent, newClassName, newText) {
  const parent = document.querySelector(newParent);
  const createElement = document.createElement(newTag);
  createElement.className = newClassName;
  createElement.textContent = newText;
  parent.appendChild(createElement);
}

function gameParam () {

  createNewElement('div', '.numGuessing', 'numberGameEnd');
  if (gameResult === '0') {
    createNewElement('div', '.numGuessing', 'numberGameResultLose', 'Try again');
  } else if (gameResult === '1') {
    createNewElement('div', '.numGuessing', 'numberGameResultWin', 'Congrats');
  }

  if (gameStatus === '0') {
  createNewElement('div', '.numberGameEnd', 'numberGameButton numberGameStartBtn', 'Start');
  createNewElement('label', '.numberGameEnd', 'label-1', 'Lines:');
  createNewElement('input', '.numberGameEnd', 'startParam numberGameRow');
  createNewElement('label', '.numberGameEnd', 'label-2', 'Numbers:');
  createNewElement('input', '.numberGameEnd', 'startParam numberGameColumn');
  } else if (gameStatus === '1') {
    let remArr = ['.numberGameStartBtn', '.numberGameRow', '.numberGameColumn', '.label-1', '.label-2', '.numberGameEnd'];

    for (let element of remArr) {  
      let elemExist = document.querySelector(element);
      if (elemExist) {
        removeElement(element);
      }
    }
    
    createNewElement('div', '.numGuessing', 'numberGameButton', 'Check');
  }
}

const gameStart = document.querySelector('.numberGameStartBtn');
const gameRow = document.querySelector('.numberGameRow');
const gameCol = document.querySelector('.numberGameColumn');

gameStart.addEventListener('click', () => { 
  col = gameCol.value;
  row = gameRow.value;
  defaultCells = col * row;
  console.log(defaultCells);

  removeCells();

  gameStarting();   
  
  // Get all cells
  const cells = document.querySelectorAll('.numCell');
  cells.forEach((element, index) => {
    cellArr[index] = element;  
  });
  console.log(cellArr);
        
  for (let i = 0; i < col; i ++) {
    if (i < col) {
      cellArr[i].classList += ' activeCell aC-' + i;
    }
  } 

  // Secret Code generation
  for (let i = 0; i < col; i++) { 
    secretCode[i] = Math.floor(Math.random()* 9);
  }  
  console.log(secretCode);

  gameStatus = '1';  

  gameParam();

  console.log('Game Started');

});

gameStarting(); 



