// Get DOM elements
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const colorContainer = document.getElementById('colorContainer');
const infoBox = document.getElementById('infoBox');

// Function to create a color box
function createColorBox(color) {
    if(color.trim() === "") return; // ignore empty input
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.backgroundColor = color;
    colorContainer.appendChild(box);
}

// Function to display browser info (BOM)
function displayBrowserInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;
    infoBox.textContent = `Window Size: ${width}x${height} | Browser Info: ${userAgent}`;
}

// Add colors
addBtn.addEventListener('click', () => {
    createColorBox(color1.value);
    createColorBox(color2.value);
    createColorBox(color3.value);

    displayBrowserInfo();
});

// Clear all boxes
clearBtn.addEventListener('click', () => {
    colorContainer.innerHTML = '';
    infoBox.textContent = '';
});
