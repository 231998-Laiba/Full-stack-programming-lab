const boxContainer = document.getElementById('boxContainer');
const clearBtn = document.getElementById('clearBtn');

// Function to create color box
function addColorBox(inputId) {

    const colorInput = document.getElementById(inputId).value;

    // Validation
    if (colorInput.trim() === "") {
        alert("Please enter a color!");
        return;
    }

    // Create div box
    const colorBox = document.createElement('div');

    colorBox.classList.add('colorBox');

    // Apply color
    colorBox.style.backgroundColor = colorInput;

    // Add box to container
    boxContainer.appendChild(colorBox);
}

// Clear all boxes
clearBtn.addEventListener('click', () => {
    boxContainer.innerHTML = "";
});

// Display Window Width & Height using BOM
const windowSize = document.getElementById('windowSize');

windowSize.textContent =
    `Window Size: Width = ${window.innerWidth}px, Height = ${window.innerHeight}px`;

// Display Browser Info using BOM
const browserInfo = document.getElementById('browserInfo');

browserInfo.textContent =
    `Browser: ${navigator.userAgent}`;