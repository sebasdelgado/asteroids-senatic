// ── leaderboard.js ────────────────────────────────────────────────────────────
//
// Este archivo controla la pantalla de Tabla de Puntajes (leaderboard.html).
// Esta es una pantalla PROTEGIDA: requiere sesión activa para acceder.
//
// Flujo general que debes lograr:
//   1. Verificar sesión con requireLogin().
//   2. Mostrar botones de perfil y logout si hay sesión.
//   3. Conectar los botones a sus destinos de navegación.
//   4. Cargar los puntajes desde el servidor.
//   5. Construir la tabla HTML y mostrarla en pantalla.
//
// ─────────────────────────────────────────────────────────────────────────────

// TODO #1 — Importar requireLogin
// ─────────────────────────────────────────────────────────────────────────────
// Importa la función requireLogin desde auth-guard.js (misma carpeta src/ui/).
//
// Sintaxis ES6:  import { nombreFuncion } from './archivo.js';

/* TU CÓDIGO AQUÍ */


// Ruta base del servidor (no la cambies)
const SERVER = '../server';


// TODO #2 — Ejecutar la lógica principal con requireLogin
// ─────────────────────────────────────────────────────────────────────────────
// requireLogin() es async y devuelve true si hay sesión válida (o redirige
// a index.html si no la hay). Todo el código de la página va dentro de:
//
//   if (await requireLogin()) {
//     // ... aquí va el resto ...
//   }
//
// Dentro del if debes hacer:
//   a) Leer el usuario desde localStorage:
//        const user = localStorage.getItem('user')
//          ? JSON.parse(localStorage.getItem('user'))
//          : null;
//
//   b) Si user existe, mostrar btn-profile y btn-logout:
//        document.getElementById('btn-profile').classList.remove('hidden');
//        document.getElementById('btn-logout').classList.remove('hidden');
//
//   c) Conectar los eventos click de los cuatro botones (ver TODO #3).
//
//   d) Llamar a loadLeaderboard() para cargar los puntajes.

/* TU CÓDIGO AQUÍ */


// TODO #3 — Conectar los botones de navegación
// ─────────────────────────────────────────────────────────────────────────────
// Cada botón tiene un id y debe redirigir a una página distinta.
// Usa addEventListener('click', () => { window.location.href = 'ruta'; })
//
// Tabla de destinos:
//   btn-home      →  'home.html'           (misma carpeta pages/)
//   btn-rankings  →  'rankings.html'       (misma carpeta pages/)
//   btn-profile   →  'profile.html'        (misma carpeta pages/)
//   btn-logout    →  borra token y user de localStorage, luego va a '../index.html'
//
// Para btn-logout el orden es:
//   1. localStorage.removeItem('token');
//   2. localStorage.removeItem('user');
//   3. window.location.href = '../index.html';
//
// Escribe el código de los cuatro botones dentro del if del TODO #2.


// ─────────────────────────────────────────────────────────────────────────────
// loadLeaderboard — carga los puntajes desde el servidor y llama a render()
// ─────────────────────────────────────────────────────────────────────────────

async function loadLeaderboard() {
  try {
    // TODO #4 — Hacer el fetch al servidor
    // ───────────────────────────────────────────────────────
    // Esta pantalla hace fetch DIRECTO al backend PHP (sin mock JSON):
    //
    //   const res  = await fetch(`${SERVER}/leaderboard.php?limit=10`);
    //   const data = await res.json();
    //
    // Luego llama a render(data.scores) para mostrar la tabla.
    //
    // ⚠️  Si el backend PHP aún no está conectado, este fetch va a fallar
    // y debería caer en el catch — eso es correcto, no es un error tuyo.

    /* TU CÓDIGO AQUÍ */

  } catch {
    // Si algo falla (red, servidor no disponible, JSON inválido) muestra error.
    document.getElementById('lb-content').textContent = 'No se pudo cargar la tabla.';
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// render — construye la tabla HTML y la inyecta en #lb-content
// ─────────────────────────────────────────────────────────────────────────────

function render(scores) {

  // Si no hay puntajes, muestra un mensaje y termina.
  if (!scores.length) {
    document.getElementById('lb-content').textContent = 'Aún no hay puntajes registrados.';
    return;
  }

  // Medallas para los tres primeros lugares
  const medals = ['🥇', '🥈', '🥉'];

  // TODO #5 — Construir las filas de la tabla
  // ───────────────────────────────────────────────────────────────────────────
  // Usa scores.map() para convertir cada objeto puntaje en un string HTML <tr>.
  //
  // Cada objeto "s" del array tiene estas propiedades:
  //   s.username  → nombre del jugador  (string)
  //   s.score     → puntaje numérico    (number)
  //   s.level     → nivel alcanzado     (number)
  //   s.date      → fecha ISO           (string, ej: "2025-05-15 20:14:32")
  //
  // Estructura de cada fila:
  //   <tr class="gold | silver | bronze | (vacío)">
  //     <td> medalla o número de posición </td>
  //     <td> nombre de usuario </td>
  //     <td> puntaje formateado con separador de miles </td>
  //     <td> "Nv. X" donde X es el nivel </td>
  //     <td class="date"> solo los primeros 10 caracteres de la fecha </td>
  //   </tr>
  //
  // Pistas:
  //   · La clase de la fila depende del índice i:
  //       i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''
  //
  //   · Para la primera columna, si existe medals[i] úsala; si no, usa i + 1.
  //       medals[i] ?? i + 1
  //
  //   · Para formatear el número con separador de miles:
  //       Number(s.score).toLocaleString()
  //
  //   · Para recortar la fecha a 10 caracteres (solo "YYYY-MM-DD"):
  //       s.date.slice(0, 10)
  //
  //   · Usa template literals (backticks) para armar el HTML, y al final
  //     del map agrega .join('') para unir todas las filas en un solo string.

  const rows = /* TU CÓDIGO AQUÍ → scores.map(...).join('') */ '';

  // TODO #6 — Inyectar la tabla completa en #lb-content
  // ───────────────────────────────────────────────────────────────────────────
  // Usa innerHTML para poner el HTML de la tabla dentro del div#lb-content.
  //
  // La tabla debe tener esta estructura:
  //   <table>
  //     <thead>
  //       <tr><th>#</th><th>Jugador</th><th>Puntaje</th><th>Nivel</th><th>Fecha</th></tr>
  //     </thead>
  //     <tbody>
  //       (aquí van las filas que construiste en el TODO #5)
  //     </tbody>
  //   </table>
  //
  // Pista: document.getElementById('lb-content').innerHTML = `...`;

  /* TU CÓDIGO AQUÍ */
}
