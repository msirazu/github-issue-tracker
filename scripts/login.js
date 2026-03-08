const form = document.getElementById('form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    const password = e.target.password.value;

    if (userName !== 'admin') {
        errorMsg.innerText = 'username incorrect';
        return;
    }

    if (password !== 'admin123') {
        errorMsg.innerText = 'password incorrect';
        return;
    }

    errorMsg.innerText = '';
    successMsg.innerText = '';
    successMsg.innerText = 'login success';
    window.location.href = 'main.html';

    e.target.reset();
})