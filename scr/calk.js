let a = ''; // value 1
let b = ''; // value 2
let operator = ''; // operator
let stepNum = 1;
let activeNum = '';
let btnArr = [];

const buttons = document.querySelectorAll('.buttons .btn');
const screen = document.querySelector('.screen');

if (stepNum == 1) {
 activeNum = a;
} else {
    activeNum = b;
}

buttons.forEach((button, index) => {
    btnArr[index] = button;
    button.addEventListener("click", () => {

        if (button.classList.contains('num')) { // Number click
            if (button.classList.contains('point') && activeNum == '') { //If point click when value a = ''
                // nothing
            } else {
            activeNum += button.innerHTML; // button.innerHTML 
            screen.textContent = activeNum;    
            }
        } else if (button.classList.contains('ac')) { // If AC click
            screen.textContent = 0;
            a = '';
            b = '';
            operator = '';
            activeNum = '';
            step = 1;
        } else if (button.classList.contains('percent')) { // If percent click
            if (a != '') {
                a = a / 100;
                screen.textContent = a;
            }
        } else if (button.classList.contains('plusMinus')) { // If +/- click
            if (activeNum != '') {
                activeNum = activeNum * -1;
                screen.textContent = activeNum;
            }
        } else if (button.classList.contains('operator')) { // If operator click
            if (stepNum == 1 && a != '') {
                operator = button.textContent;
                screen.textContent = operator;
                stepNum = 2;
                activeNum = '';
            }
        } else if (button.classList.contains('equal')) { // If equal click            
            // let out = a + operator + b;
            if (operator != '') 
            {
                switch (operator) {
                    case '+':
                        out = +a + +b;
                    break;
                    case '-':
                        out = +a - +b;
                    break;
                    case 'X':
                        out = +a * +b;
                    break;
                    case '/':
                        out = +a / +b;
                    break;
                }
            }

            if (out == '') {
                screen.textContent = 0;
            } else {
                screen.textContent = out;
            }
            
            operator = '';
            b = '';
            a = out;
            activeNum = out;
            stepNum = 1;
        } 
        
        if (activeNum != '') {
            if (stepNum == 1) {
                a = activeNum;
            }
            else {b = activeNum;}
        }

        /*
        console.log('Button click');
        console.log('activeNum: ', activeNum, 'step: ', stepNum);
        console.log('a: ', a, 'operator: ', operator, 'b: ', b);
        */
    })
})



// console.log(btnArr);
