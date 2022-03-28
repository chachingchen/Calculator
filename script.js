/*additional functionality: 
1.delete key: 
2.toggle switch to ios style: only apply ios style color
*/

const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const deleteBtn = document.getElementById('del-btn');

// calculate first and second values depending on operator
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	
	'=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;
console.log('calculatorDisplay.textContent: ', calculatorDisplay.textContent);
//(calculatorDisplay.textContent === '0') ? deleteBtn.style.background = '#030303' : deleteBtn.style.background = 'grey'

function sendNumberValue(number) {
	//replace current display value if first value is entered
	if(awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	}else{
		// if currentDisply value is 0, replace it, if not add number
		const displayValue = calculatorDisplay.textContent; 
		calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
	}
	console.log('calculatorDisplay.textContent:  ',calculatorDisplay.textContent);
	return calculatorDisplay.textContent;
	if (calculatorDisplay.textContent != '0') {
			deleteBtn.style.background = '#030303'
		}
}

function addDecimal() {
	//If operator pressed, don't add decimal
	if(awaitingNextValue) return;
	//If no decimal, add one
	if(!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

function useOperator(operator) {
	const currentValue = Number(calculatorDisplay.textContent);
	//prevent multiple operators
	if(operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}
	
	// Assign first value if no value
	if(!firstValue) {
		firstValue = currentValue;
	}else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation
		firstValue = calculation; //in case calculation continue
	}
	//ready for next value, store operator
	awaitingNextValue = true;
	operatorValue = operator;
}

// Reset all values, display
function resetAll() {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
}

/*delete background color set to transparent when display show 0;
  ex. 12 show on display,press delete, now only 1 show on display; delete again, now 0 show on display */
function deleteIt() {
   const deleteVal = calculatorDisplay.textContent;
   if(deleteVal.length > 1){

   }
   console.log('deleteVal:  ',deleteVal);
}

// add Event Listeners for numbers,operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if(inputBtn.classList.length === 0) {
  	inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  }else if (inputBtn.classList.contains('operator')) {
  	inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  }else if (inputBtn.classList.contains('decimal')) {
  	inputBtn.addEventListener('click', () => addDecimal());
  }
});

//Event Listener
clearBtn.addEventListener('click', resetAll);
deleteBtn.addEventListener('click', deleteIt);