$(document).ready(function () {

    function validateName() {
        let name = $("#name").val().trim();
        if (name === "") {
            showError("#name", "Name is required");
            return false;
        }
        showSuccess("#name");
        return true;
    }

    function validateEmail() {
        let email = $("#email").val().trim();
        let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

        if (email === "") {
            showError("#email", "Email is required");
            return false;
        } else if (!email.match(emailPattern)) {
            showError("#email", "Enter valid email");
            return false;
        }

        showSuccess("#email");
        return true;
    }

    function validatePassword() {
        let password = $("#password").val().trim();

        if (password.length < 6) {
            showError("#password", "Password must be at least 6 characters");
            return false;
        }

        showSuccess("#password");
        return true;
    }

    function showError(inputId, message) {
        $(inputId)
            .addClass("error-border")
            .removeClass("success-border")
            .next(".error")
            .text(message);
    }

    function showSuccess(inputId) {
        $(inputId)
            .removeClass("error-border")
            .addClass("success-border")
            .next(".error")
            .text("");
    }

    // Blur Event (Validate on leaving field)
    $("#name").blur(validateName);
    $("#email").blur(validateEmail);
    $("#password").blur(validatePassword);

    // Submit Event
    $("#myForm").submit(function (event) {
        event.preventDefault(); // Prevent page refresh

        let isValid =
            validateName() &
            validateEmail() &
            validatePassword();

        if (isValid) {
            $("#successMessage")
                .hide()
                .text("Form submitted successfully!")
                .fadeIn();

            $("#myForm")[0].reset();
            $("input").removeClass("success-border");
        }
    });

});