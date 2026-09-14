// ── rankings.js ───────────────────────────────────────────────────────────────
// Pantalla de rankings con filtros de período (hoy / esta semana / todo el tiempo).
//
// Flujo general que debes lograr:
//   1. Leer el usuario de localStorage y mostrar btn-profile si hay sesión.
//   2. Conectar los botones de navegación (Inicio, Mi perfil).
//   3. Conectar los filtros de período.
//   4. Cargar los rankings desde el servidor según el período.
//   5. Renderizar la tabla, resaltando el top 3 y la fila del usuario actual.
//   6. Cargar el período inicial ('all') al arrancar.
//
// ─────────────────────────────────────────────────────────────────────────────

const SERVER = '../server';


// TODO #1 — Leer el usuario y mostrar btn-profile
// ─────────────────────────────────────────────────────────────────────────────
// Lee el usuario de localStorage (o null si no hay sesión).
//
//   const user = localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user'))
//     : null;
//
// Si user existe, muestra el botón Mi perfil (oculto por defecto):
//
//   if (user) {
//     document.getElementById('btn-profile').classList.remove('hidden');
//   }
//
// También declara una variable para guardar el período actual,
// inicializada en 'all':
//
//   let currentPeriod = 'all';

/* TU CÓDIGO AQUÍ */


// TODO #2 — Conectar los botones de navegación
// ─────────────────────────────────────────────────────────────────────────────
// Conecta los dos botones:
//
//   btn-home    → navega a 'home.html'
//   btn-profile → navega a 'profile.html'
//
// Usa addEventListener('click', () => { window.location.href = '...'; })
// para cada uno.

/* TU CÓDIGO AQUÍ */


// TODO #3 — Conectar los filtros de período
// ─────────────────────────────────────────────────────────────────────────────
// Hay tres botones con clase "filter-btn", cada uno con un atributo
// data-period ('all', 'week' o 'today').
//
// Usa document.querySelectorAll('.filter-btn') para obtener los tres,
// y .forEach() para conectar el evento click de cada uno.
//
// Al hacer clic en un filtro:
//   1. Quita la clase 'active' de TODOS los botones de filtro:
//        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
//   2. Agrega la clase 'active' SOLO al botón que se clickeó:
//        btn.classList.add('active');
//   3. Actualiza la variable currentPeriod con el valor de data-period:
//        currentPeriod = btn.dataset.period;
//   4. Llama a loadRankings(currentPeriod) para recargar la tabla.
//
// Estructura:
//   document.querySelectorAll('.filter-btn').forEach(btn => {
//     btn.addEventListener('click', () => {
//       // ... pasos 1 a 4 ...
//     });
//   });

/* TU CÓDIGO AQUÍ */


// ─────────────────────────────────────────────────────────────────────────────
// loadRankings — carga los rankings del período indicado
// ─────────────────────────────────────────────────────────────────────────────

async function loadRankings(period) {
  const el = document.getElementById('rankings-content');
  el.textContent = 'Cargando…';

  try {
    // TODO #4 — Hacer el fetch al servidor con el período
    // ───────────────────────────────────────────────────────
    // Esta pantalla hace fetch DIRECTO al backend PHP, pasando
    // el período y un límite de 15 resultados como parámetros de URL:
    //
    //   const res  = await fetch(`${SERVER}/rankings.php?period=${period}&limit=15`);
    //   const data = await res.json();
    //
    // Luego llama a render(data.scores, period) para mostrar la tabla.
    //
    // ⚠️  Si el backend PHP aún no está conectado, este fetch va a fallar
    // y debería caer en el catch — eso es correcto.

    /* TU CÓDIGO AQUÍ */

  } catch {
    el.textContent = 'No se pudo cargar la tabla.';
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// render — construye la tabla HTML y la inyecta en #rankings-content
// ─────────────────────────────────────────────────────────────────────────────

function render(scores, period) {
  const el     = document.getElementById('rankings-content');
  const myUser = user?.username;

  // TODO #5a — Manejar el caso de array vacío con mensaje según el período
  // ─────────────────────────────────────────────────────────────────────────
  // Si scores está vacío, muestra un mensaje DISTINTO según el período:
  //
  //   period === 'all'   → "No hay puntajes registrados."
  //   period === 'week'  → "No hay puntajes esta semana."
  //   period === 'today' → "No hay puntajes hoy."
  //
  // Pista: usa un objeto como diccionario de etiquetas:
  //   const labels = { all: 'registrados', week: 'esta semana', today: 'hoy' };
  //
  // Luego construye el mensaje:
  //   `No hay puntajes ${labels[period]}.`
  //
  // Estructura:
  //   if (!scores.length) {
  //     const labels = { all: 'registrados', week: 'esta semana', today: 'hoy' };
  //     el.textContent = `No hay puntajes ${labels[period]}.`;
  //     return;
  //   }

  /* TU CÓDIGO AQUÍ */


  // Medallas para los tres primeros lugares
  const medals = ['🥇', '🥈', '🥉'];

  // TODO #5b — Construir las filas de la tabla, incluyendo my-row
  // ─────────────────────────────────────────────────────────────────────────
  // Usa scores.map() para convertir cada objeto puntaje en un string HTML <tr>.
  //
  // Cada objeto "s" tiene: s.username, s.score, s.level, s.date
  //
  // Para cada fila necesitas calcular DOS cosas:
  //
  //   a) La clase de posición (igual que en Leaderboard):
  //        i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''
  //
  //   b) La clase de "fila propia" — NUEVO en esta pantalla:
  //        si s.username === myUser, agrega también la clase 'my-row'
  //
  //   Ambas clases pueden combinarse en el mismo <tr>, separadas por espacio:
  //     <tr class="gold my-row">   o   <tr class="silver">   o   <tr class="my-row">
  //
  // Para el nombre de usuario, si es la fila propia, agrega el texto ' ← tú':
  //   ${s.username}${s.username === myUser ? ' ← tú' : ''}
  //
  // El resto de columnas (puntaje formateado, nivel, fecha recortada)
  // es igual a Leaderboard:
  //   · Number(s.score).toLocaleString()
  //   · Nv. ${s.level}
  //   · s.date.slice(0, 10)
  //
  // Estructura de cada fila:
  //   <tr class="${clasePosicion} ${claseMiFila}">
  //     <td>${medals[i] ?? i + 1}</td>
  //     <td>${s.username}${esmiFila ? ' ← tú' : ''}</td>
  //     <td>${Number(s.score).toLocaleString()}</td>
  //     <td>Nv. ${s.level}</td>
  //     <td class="date">${s.date.slice(0, 10)}</td>
  //   </tr>
  //
  // Al final del map usa .join('') para unir todas las filas.

  const rows = /* TU CÓDIGO AQUÍ → scores.map(...).join('') */ '';


  // TODO #6 — Inyectar la tabla completa en #rankings-content
  // ─────────────────────────────────────────────────────────────────────────
  // Igual que en Leaderboard: usa innerHTML para poner el HTML de la
  // tabla dentro de #rankings-content.
  //
  //   el.innerHTML = `
  //     <table>
  //       <thead>
  //         <tr><th>#</th><th>Jugador</th><th>Puntaje</th><th>Nivel</th><th>Fecha</th></tr>
  //       </thead>
  //       <tbody>${rows}</tbody>
  //     </table>
  //   `;

  /* TU CÓDIGO AQUÍ */
}


// TODO #7 — Cargar el período inicial al arrancar
// ─────────────────────────────────────────────────────────────────────────────
// Al final del archivo, fuera de cualquier función, llama a:
//
//   loadRankings('all');
//
// Esto hace que la tabla se cargue automáticamente con el filtro
// "Todo el tiempo" en cuanto la página termina de cargar el script,
// sin que el usuario tenga que hacer clic en ningún filtro.

/* TU CÓDIGO AQUÍ */
