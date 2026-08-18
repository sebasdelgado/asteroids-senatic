
function showError(msg) {
    const el = document.getElementById('register-error');
    el.textContent = msg;
    el.classList.remove('hidden');
}

function clearError() {
  document.getElementById('register-error').classList.add('hidden');
}


// document.getElementById('reg-username').addEventListener('input', clearError);
// document.getElementById('reg-password').addEventListener('input', clearError);


document.getElementById('btn-register').addEventListener('click', async () => {

    clearError();

    const username = document.getElementById('reg-username').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    if(!username) return showError('El nombre de usuario es obligatorio.');
    if(username.length < 3) return showError('El usuario debe tener al menos 3 caracteres');
    if (!password) return showError('La contraseña es obligatoria.');
    if (password.length < 4) return showError('La contraseña debe tener al menos 4 caracteres.');
    if( password !== password2) return showError('las contraseñas no coninciden');

});




