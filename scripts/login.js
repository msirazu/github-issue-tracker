const form = document.getElementById('form');
const errorMsg = document.getElementById('error-msg');
const successMsg = document.getElementById('success-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    const password = e.target.password.value;

    if (userName !== 'admin') {
        errorMsg.innerText = '';
        errorMsg.innerText = 'username incorect';
        return;
    }

    if (password !== 'admin123') {
        errorMsg.innerText = '';
        errorMsg.innerText = 'password incorect';
        return;
    }

    successMsg.innerText = '';
    successMsg.innerText = 'login success';
    window.open('main.html', '_self');

    e.target.name.value = '';
    e.target.password.value = '';
})


