// remover bar
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// validations

document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.querySelector('.form-container.sing-in form');
    const signUpForm = document.querySelector('.form-container.sing-up form');

    // Load saved data from localStorage if available
    loadFormData();

    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSignIn()) {
            // Redirect to home.html on successful sign in
            window.location.href = "../html/home.html";
        }
    });

    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateSignUp()) {
            saveFormData();
            showSuccess('signup-success-message');
            // Clear form fields after successful submission
            signUpForm.reset();
        }
    });

    function validateSignIn() {
        clearMessages();
        const name = document.querySelector('.sing-in #name').value.trim();
        const password = document.querySelector('.sing-in #password').value.trim();
        let isValid = true;

        if (!name) {
            showError('signin-name-error');
            isValid = false;
        }

        if (!password) {
            showError('signin-password-error');
            isValid = false;
        } else if (password.length < 8) {
            showError('signin-password-error');
            isValid = false;
        }

        if (!isValid) {
            return false;
        }

        const storedData = localStorage.getItem('signUpFormData');
        if (storedData) {
            const { firstName, password: storedPassword } = JSON.parse(storedData);
            if (name === firstName && password === storedPassword) {
                return true;
            } else {
                showError('signin-invalid-error');
                return false;
            }
        } else {
            showError('signin-invalid-error');
            return false;
        }
    }

    function validateSignUp() {
        clearMessages();
        const firstName = document.querySelector('.sing-up #name').value.trim();
        const email = document.querySelector('.sing-up #email').value.trim();
        const phone = document.querySelector('.sing-up #phone').value.trim();
        const password = document.querySelector('.sing-up #password').value.trim();
        const confirmPassword = document.querySelector('.sing-up #confirm-password').value.trim();
        let isValid = true;

        if (!firstName) {
            showError('signup-name-error');
            isValid = false;
        } else {
            const namePattern = /^[A-Za-z\s]+$/;
            if (!namePattern.test(firstName)) {
                showError('signup-name-invalid-error');
                isValid = false;
            }
        }

        if (!email) {
            showError('signup-email-error');
            isValid = false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showError('signup-email-invalid-error');
                isValid = false;
            }
        }

        if (!phone) {
            showError('signup-phone-error');
            isValid = false;
        } else {
            const phonePattern = /^\d{10,15}$/;
            if (!phonePattern.test(phone)) {
                showError('signup-phone-invalid-error');
                isValid = false;
            }
        }

        if (!password) {
            showError('signup-password-error');
            isValid = false;
        } else if (password.length < 8) {
            showError('signup-password-error');
            isValid = false;
        } else {
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(password)) {
                showError('signup-password-invalid-error');
                isValid = false;
            }
        }

        if (!confirmPassword) {
            showError('signup-confirm-password-error');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('signup-confirm-password-mismatch-error');
            isValid = false;
        }

        return isValid;
    }

    function saveFormData() {
        const firstName = document.querySelector('.sing-up #name').value.trim();
        const email = document.querySelector('.sing-up #email').value.trim();
        const phone = document.querySelector('.sing-up #phone').value.trim();
        const password = document.querySelector('.sing-up #password').value.trim();
        const confirmPassword = document.querySelector('.sing-up #confirm-password').value.trim();

        const formData = {
            firstName,
            email,
            phone,
            password,
            confirmPassword
        };

        localStorage.setItem('signUpFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('signUpFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);

            document.querySelector('.sing-up #name').value = formData.firstName;
            document.querySelector('.sing-up #email').value = formData.email;
            document.querySelector('.sing-up #phone').value = formData.phone;
            document.querySelector('.sing-up #password').value = formData.password;
            document.querySelector('.sing-up #confirm-password').value = formData.confirmPassword;
        }
    }

    function showError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'block';
    }

    function showSuccess(elementId) {
        const successElement = document.getElementById(elementId);
        successElement.style.display = 'block';
    }

    function clearMessages() {
        const messages = document.querySelectorAll('.error-message, .success-message');
        messages.forEach((msg) => {
            msg.style.display = 'none';
        });
    }
});
