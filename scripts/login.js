document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userName = e.target.name.value;
    const password = e.target.password.value;

    if (userName !== 'admin') {
        alert('username incorect');
        return;
    }

    if (password !== 'admin123') {
        alert('password incorect');
        return;
    }

    window.open('main.html', '_self');

    e.target.name.value = '';
    e.target.password.value = '';
})


