const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operation = document.getElementById('operation');
const calculateBtn = document.getElementById('calculateBtn');
const resultBox = document.getElementById('resultBox');

calculateBtn.addEventListener('click', () => {
    const val1 = parseFloat(num1.value);
    const val2 = parseFloat(num2.value);
    let result;

    // Input validation
    if (isNaN(val1) || isNaN(val2)) {
        resultBox.textContent = "Please enter valid numbers!";
        resultBox.style.backgroundColor = "#ffcccc"; // light red for error
        return;
    }

    switch(operation.value) {
        case 'add':
            result = val1 + val2;
            break;
        case 'subtract':
            result = val1 - val2;
            break;
        case 'multiply':
            result = val1 * val2;
            break;
        case 'divide':
            if (val2 === 0) {
                resultBox.textContent = "Cannot divide by zero!";
                resultBox.style.backgroundColor = "#ffcccc"; // light red for error
                return;
            }
            result = val1 / val2;
            break;
        default:
            resultBox.textContent = "Invalid operation!";
            return;
    }

    // Display result with dynamic background color
    resultBox.textContent = `Result: ${result}`;
    if (result > 0) {
        resultBox.style.backgroundColor = "#c8e6c9"; // green for positive
    } else if (result < 0) {
        resultBox.style.backgroundColor = "#ffcdd2"; // red for negative
    } else {
        resultBox.style.backgroundColor = "#e0e0e0"; // gray for zero
    }
});
