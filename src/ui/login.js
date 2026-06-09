// ── login.js ──────────────────────────────────────────────────────────────────
//
// Este archivo controla la pantalla de Login (index.html).
// Tu trabajo es implementar las partes marcadas con TODO.
//
// Flujo general que debes lograr:
//   1. showError / clearError → manejar mensajes de error en pantalla.
//   2. goToHome               → guardar sesión y navegar al home.
//   3. btn-login click        → hacer fetch y procesar la respuesta.
//   4. btn-register click     → navegar a la pantalla de registro.
//   5. btn-guest click        → limpiar sesión y entrar como invitado.
//   6. Enter en password      → disparar el login con el teclado.
//   7. Auto-login             → si ya hay sesión, saltar el formulario.
//
// ─────────────────────────────────────────────────────────────────────────────

// Ruta base del servidor (no la cambies)
const SERVER = 'server';

// Helpers para leer los campos del formulario (ya implementados)
const username = () => document.getElementById('username').value.trim();
const password = () => document.getElementById('password').value;


// ─────────────────────────────────────────────────────────────────────────────
// TODO #1 — showError(msg)
// ─────────────────────────────────────────────────────────────────────────────
// Esta función recibe un mensaje de texto y lo muestra en el div#login-error.
//
// Pasos:
//   1. Obtén el elemento con document.getElementById('login-error')
//   2. Ponle el texto del mensaje usando .textContent = msg
//   3. Quítale la clase 'hidden' con .classList.remove('hidden')
//      (así el div se hace visible — por defecto está oculto)
//
function showError(msg) {
  /* TU CÓDIGO AQUÍ */
}


// ─────────────────────────────────────────────────────────────────────────────
// TODO #2 — clearError()
// ─────────────────────────────────────────────────────────────────────────────
// Esta función oculta el mensaje de error cuando ya no es necesario.
//
// Pasos:
//   1. Obtén el elemento con document.getElementById('login-error')
//   2. Agrégale la clase 'hidden' con .classList.add('hidden')
//
function clearError() {
  /* TU CÓDIGO AQUÍ */
}


// ─────────────────────────────────────────────────────────────────────────────
// TODO #3 — goToHome(data)
// ─────────────────────────────────────────────────────────────────────────────
// Esta función guarda la sesión del usuario y navega a home.html.
// Recibe "data" que puede ser el objeto { user, token } o null (invitado).
//
// Pasos:
//   1. Si data no es null/undefined:
//      · Guarda el usuario: localStorage.setItem('user', JSON.stringify(data.user))
//      · Guarda el token:   localStorage.setItem('token', data.token)
//   2. Navega a home: window.location.href = 'pages/home.html'
//
// Pista: para verificar si data existe usa simplemente:  if (data) { ... }
//
function goToHome(data) {
  /* TU CÓDIGO AQUÍ */
}


// ─────────────────────────────────────────────────────────────────────────────
// TODO #4 — Evento click del botón login (btn-login)
// ─────────────────────────────────────────────────────────────────────────────
// Al hacer clic en "Entrar", el sistema debe:
//   1. Llamar clearError() para limpiar errores previos.
//   2. Hacer un fetch al JSON simulado: './src/data/login.json'
//   3. Convertir la respuesta a objeto JS con .json()
//   4. Si la respuesta NO es ok (res.ok === false), lanzar un error:
//      throw new Error(data.error)
//   5. Si todo sale bien, llamar goToHome(data)
//   6. Si hay cualquier error (catch), llamar showError(e.message)
//
// Pista: la función del evento debe ser async para poder usar await.
// Estructura:
//   document.getElementById('btn-login').addEventListener('click', async () => {
//     clearError();
//     try {
//       const res  = await fetch('./src/data/login.json');
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error);
//       goToHome(data);
//     } catch (e) { showError(e.message); }
//   });

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// TODO #5 — Evento click del botón registro (btn-register)
// ─────────────────────────────────────────────────────────────────────────────
// Al hacer clic en "Registrarse", simplemente navega a pages/register.html.
// No necesitas hacer fetch ni verificar nada.
//
//   document.getElementById('btn-register').addEventListener('click', () => {
//     window.location.href = 'pages/register.html';
//   });

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// TODO #6 — Evento click del botón invitado (btn-guest)
// ─────────────────────────────────────────────────────────────────────────────
// Al hacer clic en "Jugar como invitado":
//   1. Borra cualquier sesión previa:
//      localStorage.removeItem('user');
//      localStorage.removeItem('token');
//   2. Navega a pages/home.html
//
// Nota: no llames a goToHome(data) aquí — esa función guarda datos.
// Llama directamente a window.location.href = 'pages/home.html'

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// TODO #7 — Enter en el campo contraseña dispara el login
// ─────────────────────────────────────────────────────────────────────────────
// Cuando el usuario presiona Enter mientras escribe la contraseña,
// debe ejecutarse el mismo proceso que al hacer clic en btn-login.
//
// Pista: escucha el evento 'keydown' en el campo #password.
// Dentro del handler verifica si e.key === 'Enter'.
// Si es así, simula el clic del botón:
//   document.getElementById('btn-login').click();

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// TODO #8 — Limpiar error al escribir en los campos
// ─────────────────────────────────────────────────────────────────────────────
// Si hay un error visible y el usuario empieza a escribir en cualquier campo,
// el error debe desaparecer automáticamente.
//
// Conecta el evento 'input' de AMBOS campos (#username y #password)
// para que llamen a clearError() cada vez que el usuario escribe.

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// TODO #9 — Auto-login si ya hay sesión activa
// ─────────────────────────────────────────────────────────────────────────────
// Al cargar la página, si hay un token guardado en localStorage,
// el sistema debe verificarlo y redirigir al home sin mostrar el formulario.
//
// Esto se hace en una función async que se ejecuta inmediatamente (IIFE).
// Estructura:
//
//   (async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;  // si no hay token, no hacer nada
//     try {
//       const res = await fetch(`${SERVER}/me.php`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) window.location.href = 'pages/home.html';
//     } catch { }  // si falla la red, simplemente muestra el formulario
//   })();
//
// Pista: el paréntesis al final ()  ejecuta la función inmediatamente.
// Esto se llama IIFE (Immediately Invoked Function Expression).

/* TU CÓDIGO AQUÍ */
