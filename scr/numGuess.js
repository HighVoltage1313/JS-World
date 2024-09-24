const numberGame = document.querySelector('.numGuessing');
const grid = document.querySelector('.gridNumGame');

let defaultCells = 25;
let col = '5';
let row = '5';
let rowStep = 0;

let secretCode = [];
let cellArr = [];

let gameStatus = '0'; // 0 - Ended, 1 - Started
let gameResult = ''; // 0 - Lose, 1 - Win



function createNewElement(newTag, newParent, newClassName, newText) {
  const parent = document.querySelector(newParent);
  const createElement = document.createElement(newTag);
  createElement.className = newClassName;
  createElement.textContent = newText;
  parent.appendChild(createElement);
}
    
createNewElement('div', '.numGuessing', 'numberGameResultLose', 'Try again');
createNewElement('div', '.numGuessing', 'numberGameResultWin', 'Congrats'); 

createNewElement('div', '.numGuessing', 'numberGameEnd');
createNewElement('div', '.numberGameEnd', 'numberGameButton numberGameStartBtn', 'Start');
createNewElement('label', '.numberGameEnd', 'label-1', 'Lines:');
createNewElement('input', '.numberGameEnd', 'startParam numberGameRow');
createNewElement('label', '.numberGameEnd', 'label-2', 'Numbers:');
createNewElement('input', '.numberGameEnd', 'startParam numberGameColumn');

createNewElement('div', '.numGuessing', 'numberGameButton numberGameButtonCheck', 'Check');

let remArr = [  
  '.numberGameResultLose', 
  '.numberGameResultWin',
  '.numberGameButtonCheck'];

for (let element of remArr) {  
  let elemExist = document.querySelector(element);
  if (elemExist) {
    removeElement(element);
  }
}

const ngr = document.querySelector('.numberGameRow');
const ngc = document.querySelector('.numberGameColumn');

ngr.setAttribute('maxlength', '1');
ngc.setAttribute('maxlength', '1');

ngr.value = row;
ngc.value = col;

ngr.onkeydown = (event) => {
  // Only allow if the e.key value is a number or if it's 'Backspace'
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
  
};

ngc.onkeydown = (event) => {
  // Only allow if the e.key value is a number or if it's 'Backspace'
  if(isNaN(event.key) && event.key !== 'Backspace') {
    event.preventDefault();
  }
  
};

//gameParam();

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

  rowStep = 1;
}

function removeCells() {
  const getCells = document.querySelectorAll('.numCell')
  getCells.forEach((element) =>{
    element.remove();
  });

}

function removeElement(elementToRemove) {
  const getElement = document.querySelectorAll(elementToRemove)
  getElement.forEach((element) => {
    element.style.display = 'none';
  });
}

function undoElement(elementToRemove) {
  const getElement = document.querySelectorAll(elementToRemove)
  getElement.forEach((element) => {
    element.style.display = '';
  });
}

function gameParam () {

  if (gameResult === '0') {
    document.querySelector('.numberGameResultLose').style.display = 'block';
  } else if (gameResult === '1') {    
    document.querySelector('.numberGameResultWin').style.display = 'block';
  }

  if (gameStatus === '0') {
    document.querySelector('.numberGameButtonCheck').style.display = 'none';

  let undoArr = [
    '.numberGameStartBtn',
    '.numberGameRow',
    '.numberGameColumn',
    '.label-1', 
    '.label-2', 
    '.numberGameEnd'];

  for (let element of undoArr) {  
    let elemNotExist = document.querySelector(element);
    if (elemNotExist) {
      undoElement(element);
    }
  } 

  } else if (gameStatus === '1') {   

    document.querySelector('.numberGameButtonCheck').style.display = 'block';

    let remArr = [
      '.numberGameStartBtn', 
      '.numberGameRow', 
      '.numberGameColumn', 
      '.label-1', 
      '.label-2', 
      '.numberGameEnd', 
      '.numberGameResultLose', 
      '.numberGameResultWin'];

    for (let element of remArr) {  
      let elemExist = document.querySelector(element);
      if (elemExist) {
        removeElement(element);
      }
    }

    const checkButton = document.querySelector('.numberGameButtonCheck');
    checkButton.addEventListener('click', () => {
      let cells = getAllCells();
      let correctNum = 0;
      let activeArr = [];

      cells.forEach((element) => {        
        let isActive = element.classList.contains('activeCell');        
        if (isActive && element.value != '') {
          activeArr.push(element);
        }   
      })

      if (activeArr.length == col) {

      activeArr.forEach((element, index) => {
        element.classList.remove('activeCell');
        if (Number(element.value) === secretCode[index]) {
          element.offsetWidth;
          element.classList.add('correctPosNum');
          correctNum++;
          void element.offsetWidth;
        } else {            
          for (let secretElem of secretCode) {
            if (Number(element.value) === secretElem) {
              element.offsetWidth;
              element.classList.add('correctNum');
              void element.offsetWidth;
            }
          }
        }
      })

      if (correctNum == col) {
        gameStatus = '0';
        gameResult = '1';
        gameParam();
        return;
      }

      if (rowStep != row) {   
        
       rowStep++;     

        cells.forEach((element, index) => {
            if ( rowStep * col > index && index > (rowStep * col) - 1 - col ) {
              element.classList.add('activeCell');
            }
        })
      } else if (rowStep == row) {
        gameStatus = '0';
        gameResult = '0';
        gameParam();
        return;
      } 
    }
    });
  }
}

function getAllCells () {
  
  // Get all cells
  const cells = document.querySelectorAll('.numCell');
  cells.forEach((element, index) => {
    cellArr[index] = element;  
  });

  return cellArr;

}

const gameStart = document.querySelector('.numberGameStartBtn');
const gameRow = document.querySelector('.numberGameRow');
const gameCol = document.querySelector('.numberGameColumn');

gameStart.addEventListener('click', () => { 
  col = gameCol.value;
  row = gameRow.value;
  defaultCells = col * row;

  removeCells();

  gameStarting();   
  
  getAllCells();
        
  for (let i = 0; i < col; i ++) {
    if (i < col) {
      cellArr[i].classList += ' activeCell';
    }
  } 

  // Secret Code generation
  for (let i = 0; i < col; i++) { 
    secretCode[i] = Math.floor(Math.random()* 9);
  }  

  gameStatus = '1';  
  gameResult = '';

  gameParam();

});

gameStarting(); 