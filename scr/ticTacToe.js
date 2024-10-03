const cells = document.querySelectorAll('.ticTacToe__cell');
const buttonRestart = document.querySelector('.ticTacToe__button');
let step = 'x';

buttonRestart.addEventListener('click', () => {
    step = 'x';
    clearField();
});

function addElement(cl, parent, symb) {
    if (parent.querySelectorAll('div').length == 0) {
        const newElement = document.createElement('div');
        newElement.classList.add(cl);
        newElement.innerText = symb;
        parent.appendChild(newElement);
        parent.classList.add('cell_symb'); 
        if (step == 'x') {step = 'o'; console.log('o')}
        else if (step == 'o') {step = 'x'; console.log('x')}
        checkStatus(cl);      
    }
}

function clearField() {
    const cellsSymb = document.querySelectorAll('.ticTacToe__cell div');

    cellsSymb.forEach((element) => {
        element.remove();
    });

    cells.forEach((cell) => {
        cell.classList.remove('cell_symb');
    });
}

cells.forEach((cell) => {
    cell.addEventListener('click', () => { 
            if (step == 'x') {addElement('sX', cell, 'X');}
            else if (step == 'o') {addElement('sO', cell, 'O');}
    });
});

//0 1 2
//3 4 5
//6 7 8

function checkExist(cell, symb) {
    const element  = cell.querySelector('div');
    return element && element.classList.contains(symb);
}

function addAnim(...elem) {
    elem.forEach((n) => {
        cells[n].querySelector('div').style.animation = 'symbAnim 1s infinite linear';
    });
}

function checkStatus(symb) { 
    const winComb = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Vertical
        [0, 4, 8], [6, 4, 2],            // Duagonal
        [0, 3, 6], [1, 4, 7], [2, 5, 8]  // Horizontal
    ];

    for (const [a, b, c] of winComb) {
        if (checkExist(cells[a], symb) && checkExist(cells[b], symb) && checkExist(cells[c], symb)) {
            console.log('Winner: ' + symb); 
            addAnim(a, b, c);
            step = null;
            break;
        }
    }
}