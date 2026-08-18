

function showError(msg) {
    const el = document.getElementById('login-error');
    el.textContent = msg;
    el.classList.remove('hidden');
}

function clearError() {
  document.getElementById('login-error').classList.add('hidden');
}

function goToHome(data) {
    if(data) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
    }
    window.location.href = "pages/home.html";
}

//-- Login ----------------------//
document.getElementById('btn-login').addEventListener('click', async () => {

    clearError();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    //--Validaciones del lado del cliente ----//
    if(!username) return showError('El nombre de usuario es obligatorio.');
    if(username.length < 3) return showError('El usuario debe tener al menos 3 caracteres');

    if (!password) return showError('La contraseña es obligatoria.');
    if (password.length < 4) return showError('La contraseña debe tener al menos 4 caracteres.');


    try {

        const res = await fetch('./src/data/login.json');
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);
        goToHome(data);
        
        
    } catch (error) {
        showError(error.message);
    }

});

//-- Registro ----------------//
document.getElementById('btn-register').addEventListener('click', () => {

    window.location.href = "pages/register.html";

});

//--Invitado -----------------//
document.getElementById('btn-guest').addEventListener('click', () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "pages/home.html";

});

//-- Enter en password para disparar login ------//
document.getElementById('password').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        document.getElementById('btn-login').click();
    }
});

//-- Limpiar Errores ---//
document.getElementById('username').addEventListener('input', clearError);
document.getElementById('password').addEventListener('input', clearError);

//----Restaurar Sesion -------------//
(async () => {
    
    const token = localStorage.getItem('token');
    if(!token) return;

    // window.location.href = 'pages/home.html';

    // try {
    //     const res = await fetch();
    //     if(res.ok) {
            
    //     }
    // } catch {
        
    // }
    

})();
