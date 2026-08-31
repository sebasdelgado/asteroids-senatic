// ── register.js ───────────────────────────────────────────────────────────────
// Lógica del formulario de registro separado.

const SERVER = '../server';

const showError = msg => {
  const el = document.getElementById('register-error');
  el.textContent = msg;
  el.classList.remove('hidden');
};

const clearError = () => {
  document.getElementById('register-error').classList.add('hidden');
};

document.getElementById('reg-username').addEventListener('input', clearError);
document.getElementById('reg-password').addEventListener('input', clearError);

document.getElementById('btn-register').addEventListener('click', async () => {
  clearError();

  const username  = document.getElementById('reg-username').value.trim();
  const email     = document.getElementById('reg-email').value.trim();
  const password  = document.getElementById('reg-password').value;
  const password2 = document.getElementById('reg-password2').value;

  // ── Validaciones del lado cliente ─────────────────────────────────────────
  if (!username) return showError('El nombre de usuario es obligatorio.');
  if (username.length < 3) return showError('El usuario debe tener al menos 3 caracteres.');
  if (!password) return showError('La contraseña es obligatoria.');
  if (password.length < 4) return showError('La contraseña debe tener al menos 4 caracteres.');
  if (password !== password2) return showError('Las contraseñas no coinciden.');

  try {
    // const res  = await fetch(`${SERVER}/register.php`, {
    //   method:  'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body:    JSON.stringify({ username, email, password }),
    // });
    const res = await fetch('../src/data/login.json');
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    // Guardar sesión y redirigir al juego
    localStorage.setItem('user',  JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    window.location.href = 'game.html';

  } catch (e) { showError(e.message); }
});

// Enter en último campo dispara registro
document.getElementById('reg-password2').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('btn-register').click();
});
