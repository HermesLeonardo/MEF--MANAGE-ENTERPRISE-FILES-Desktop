function validateForm() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const email = document.getElementById('email');
    
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const emailError = document.getElementById('emailError');
    
    let isValid = true;
    
    // Limpar mensagens anteriores
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    emailError.innerHTML = "";

    password.classList.remove('error');
    confirmPassword.classList.remove('error');
    email.classList.remove('error');

    // Validação da senha
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.innerHTML = 'As senhas não são iguais.';
        confirmPassword.classList.add('error');
        isValid = false;
    }
    
    if (!isValidPassword(password.value)) {
        passwordError.innerHTML = 'A senha deve ter pelo menos uma letra maiúscula e pelo menos três números.';
        password.classList.add('error');
        isValid = false;
    }

    // Validação do email
    if (!isValidEmail(email.value)) {
        emailError.innerHTML = 'O email deve ser válido e terminar com gmail.com ou email.com.';
        email.classList.add('error');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|email\.com)$/;
    return regex.test(email);
}

function isValidPassword(password) {
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /\d/g;

    const hasUpperCase = upperCaseLetters.test(password);
    const numberCount = (password.match(numbers) || []).length;

    return hasUpperCase && numberCount >= 3;
}
