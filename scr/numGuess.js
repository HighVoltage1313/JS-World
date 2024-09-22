const numberGame = document.querySelector('.numGuessing');
const grid = document.querySelector('.gridNumGame');

let defaultCells = 25;
let col = '5';
let row = '5';

for (let i = 0; i < defaultCells; i++) {
    const numberCell = document.createElement('input');
    numberCell.className = 'numCell';
    if (i < 5) {        
        numberCell.classList += ' activeCell';
    }
    numberCell.setAttribute('maxlength', '1');
    grid.appendChild(numberCell);
    numberCell.onkeydown = (event) => {
        // Only allow if the e.key value is a number or if it's 'Backspace'
        if(isNaN(event.key) && event.key !== 'Backspace') {
          event.preventDefault();
        }
      };
}



const numberGameButton = document.createElement('div');
numberGameButton.className = 'numberGameButton';
numberGameButton.textContent = 'Check';
numberGame.appendChild(numberGameButton);
