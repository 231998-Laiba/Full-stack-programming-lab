const form = document.getElementById('registrationForm');

// Input fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');

// Error message divs
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const ageError = document.getElementById('ageError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName(name) {
    if(name.trim() === "") {
        nameError.textContent = "Name cannot be empty.";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateEmail(email) {
    if(!email.includes("@")) {
        emailError.textContent = "Email must contain @.";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validateAge(age) {
    if(age < 18 || age > 60) {
        ageError.textContent = "Age must be between 18 and 60.";
        return false;
    }
    ageError.textContent = "";
    return true;
}

function validatePassword(password) {
    if(password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        return false;
    }
    passwordError.textContent = "";
    return true;
}

// Form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent default form submission

    const nameValid = validateName(nameInput.value);
    const emailValid = validateEmail(emailInput.value);
    const ageValid = validateAge(parseInt(ageInput.value));
    const passwordValid = validatePassword(passwordInput.value);

    if(nameValid && emailValid && ageValid && passwordValid) {
        successMessage.textContent = "Registration Successful!";
        
        // Confirm submission
        if(confirm("Do you want to submit the form?")) {
            // Bonus interaction
            alert(`Welcome, ${nameInput.value}! You are now registered.`);
            
            // Optional: Reset form
            form.reset();
        }
    } else {
        successMessage.textContent = "";
    }
});
