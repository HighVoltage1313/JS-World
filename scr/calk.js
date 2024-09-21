let a = ''; // value 1
let b = ''; // value 2
let operator = ''; // operator
let stepNum = 1;
let activeNum = '';
let btnArr = [];

const buttons = document.querySelectorAll('.buttons .btn');
const screen = document.querySelector('.screen');
const log = document.querySelector('p.log');

if (stepNum == 1) {
 activeNum = a;
} else {
    activeNum = b;
}

buttons.forEach((button, index) => {
    btnArr[index] = button;
    button.addEventListener("click", () => {

        if (button.classList.contains('num')) { // Number click
            if (button.classList.contains('point') && (activeNum == '' || activeNum.includes('.'))) { //If point click when value a = ''
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
            log.textContent = '';
            step = 1;
        } else if (button.classList.contains('percent')) { // If percent click
            if (activeNum != '' && stepNum == 1) {
                activeNum = activeNum / 100;
                screen.textContent = activeNum;
            }
        } else if (button.classList.contains('plusMinus')) { // If +/- click
            if (activeNum != '') {
                activeNum = activeNum * -1;
                screen.textContent = activeNum;
            }
        } else if (button.classList.contains('operator')) { // If operator click
            if (stepNum == 1 && a != '') {
                log.innerHTML = activeNum + '<br>' + log.innerHTML;     
                operator = button.textContent;  
                const newLog = document.createElement('p');
                newLog.textContent = operator;
                log.prepend(newLog);

                operator = button.textContent;      
                screen.textContent = operator;
                stepNum = 2;
                activeNum = '';
            }
            } else if (button.classList.contains('equal')) { // If equal click            
                if (stepNum != 1 && b != '') {
                    if (operator != '') {
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

                    log.innerHTML = activeNum + '<br>' + log.innerHTML;
                    const newLog = document.createElement('p');
                    newLog.textContent = '=';
                    log.prepend(newLog);

                    operator = '';
                    b = '';
                    a = out;
                    activeNum = out;
                    stepNum = 1;
                }
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
