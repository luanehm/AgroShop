function validateFullName(fullName) {
    const errorElement = document.getElementById('fullNameError');
    const inputElement = document.getElementById('fullName');
    if (fullName.trim() === '') {
        errorElement.textContent = 'O nome completo não pode ser em branco.';
        inputElement.classList.add('invalid');
        return false;
    }
    if (fullName.trim().split(' ').length < 2) {
        errorElement.textContent = 'O nome completo deve conter ao menos um sobrenome.';
        inputElement.classList.add('invalid');
        return false;
    }
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    return true;
}

function validateEmail(email) {
    const errorElement = document.getElementById('emailError');
    const inputElement = document.getElementById('email');
    if (email.trim() === '') {
        errorElement.textContent = 'O e-mail não pode ser em branco.';
        inputElement.classList.add('invalid');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Por favor, insira um e-mail válido.';
        inputElement.classList.add('invalid');
        return false;
    }
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    return true;
}

function validateMessage(message) {
    const errorElement = document.getElementById('messageError');
    const inputElement = document.getElementById('message');
    const charCountElement = document.getElementById('charCount');

    const currentLength = message.trim().length;
    charCountElement.textContent = currentLength;

    if (message.trim() === '') {
        errorElement.textContent = 'A mensagem não pode ser em branco.';
        inputElement.classList.add('invalid');
        return false;
    }
    if (currentLength < 30) {
        errorElement.textContent = `A mensagem deve ter ao menos 30 caracteres. (Atual: ${currentLength})`;
        inputElement.classList.add('invalid');
        return false;
    }
    if (currentLength > 500) {
        errorElement.textContent = `A mensagem pode ter no máximo 500 caracteres. (Atual: ${currentLength})`;
        inputElement.classList.add('invalid');
        return false;
    }
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    return true;
}

document.getElementById('fullName').addEventListener('input', function() {
    validateFullName(this.value);
});

document.getElementById('email').addEventListener('input', function() {
    validateEmail(this.value);
});

document.getElementById('message').addEventListener('input', function() {
    validateMessage(this.value);
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const isFullNameValid = validateFullName(fullName);
    const isEmailValid = validateEmail(email);
    const isMessageValid = validateMessage(message);

    if (isFullNameValid && isEmailValid && isMessageValid) {
        document.getElementById('successModal').classList.remove('hidden');
    } else {
        if (!isFullNameValid) {
            document.getElementById('fullName').focus();
        } else if (!isEmailValid) {
            document.getElementById('email').focus();
        } else if (!isMessageValid) {
            document.getElementById('message').focus();
        }
    }
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('successModal').classList.add('hidden');
    document.getElementById('contactForm').reset();
    document.getElementById('fullName').classList.remove('invalid');
    document.getElementById('email').classList.remove('invalid');
    document.getElementById('message').classList.remove('invalid');
    document.getElementById('fullNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('charCount').textContent = '0';
});

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message');
    document.getElementById('charCount').textContent = messageInput.value.trim().length;
});
