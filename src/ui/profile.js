// TODO #1 — Importar requireLogin
// ─────────────────────────────────────────────────────────────────────────────
// Importa requireLogin desde auth-guard.js (misma carpeta src/ui/).
//
// Sintaxis:  import { requireLogin } from './auth-guard.js';

/* TU CÓDIGO AQUÍ */


const SERVER = '../server';
console.log("hola mundo")


// TODO #2 — Ejecutar la lógica principal con requireLogin
// ─────────────────────────────────────────────────────────────────────────────
// Todo el código de la página va dentro de:
//   if (await requireLogin()) { ... }
//
// Dentro del if debes hacer:
//
//   a) Leer user y token de localStorage:
//
//   b) Mostrar el nombre de usuario en #profile-username:
//
//   c) Conectar los seis botones (ver TODO #3).
//
//   d) Hacer fetch al historial (ver TODO #4), dentro de try/catch.

/* TU CÓDIGO AQUÍ */


// TODO #3 — Conectar los seis botones de navegación
// ─────────────────────────────────────────────────────────────────────────────
// Todos los botones van dentro del if del TODO #2.
//
//
// Tabla de destinos (todos en la misma carpeta pages/):
//   btn-home          →  'home.html'
//   btn-play          →  'game.html'
//   btn-leaderboard   →  'leaderboard.html'
//   btn-rankings      →  'rankings.html'
//   btn-achievements  →  'achievements.html'
//
// Para btn-logout: Remover del local storage el token y el user y redireccionar a index.html



// ─────────────────────────────────────────────────────────────────────────────
// TODO #4 — Hacer fetch al historial de puntajes
// ─────────────────────────────────────────────────────────────────────────────
// Dentro del if del TODO #2, después de conectar los botones, agrega un
// bloque try/catch para cargar los datos:
//
//   try {
//     // Fetch al JSON simulado
//     renderStats(data.scores);    ← calcula y muestra las estadísticas
//     renderHistory(data.scores);  ← construye y muestra el historial
//   } catch {
//     document.getElementById('history-content').textContent =
//       'No se pudo cargar el historial.';
//   }


// ─────────────────────────────────────────────────────────────────────────────
// renderStats — calcula y muestra las cuatro estadísticas
// ─────────────────────────────────────────────────────────────────────────────

function renderStats(scores) {

  // TODO #5a — Manejar el caso de historial vacío
  // ─────────────────────────────────────────────────────────────────────────
  // Si scores está vacío, pon "0" en los cuatro elementos y termina (return).


  /* TU CÓDIGO AQUÍ */


  // TODO #5b — Calcular las cuatro estadísticas
  // ─────────────────────────────────────────────────────────────────────────
  // Cada objeto "s" del array tiene: s.score, s.level, s.date
  //
  // Las cuatro estadísticas a calcular:
  //
  //   best   → el puntaje más alto: scores[0].score
  //            (el array ya viene ordenado de mayor a menor desde el servidor)
  //
  //   maxLvl → el nivel más alto alcanzado en cualquier partida:
  //            Math.max(...scores.map(s => s.level))
  //            (spread + map para extraer todos los niveles y quedarse con el mayor)
  //
  //   total  → cantidad de partidas: scores.length
  //
  //   avg    → promedio de puntajes, redondeado al entero más cercano:
  //            Math.round( scores.reduce((sum, s) => sum + s.score, 0) / total )
  //            (reduce suma todos los puntajes, dividimos por total, Math.round redondea)
  //
  // Pistas:
  //   · Math.max(...array)  → saca el máximo de un array de números
  //   · array.reduce((acumulador, elemento) => ..., valorInicial) → acumula un valor
  //   · Math.round(numero) → redondea al entero más cercano

  /* TU CÓDIGO AQUÍ */


  // TODO #5c — Mostrar las estadísticas en el DOM
  // ─────────────────────────────────────────────────────────────────────────
  // Pon cada valor calculado en su elemento correspondiente:
  //
  //   #best-score   → best formateado con separador de miles: best.toLocaleString()
  //   #best-level   → maxLvl (sin formato especial)
  //   #total-games  → total (sin formato especial)
  //   #avg-score    → avg formateado con separador de miles: avg.toLocaleString()

  /* TU CÓDIGO AQUÍ */
}


// ─────────────────────────────────────────────────────────────────────────────
// renderHistory — construye la tabla del historial e inyecta en #history-content
// ─────────────────────────────────────────────────────────────────────────────

function renderHistory(scores) {
  const el = document.getElementById('history-content');

  // TODO #6a — Manejar el caso de historial vacío
  // ─────────────────────────────────────────────────────────────────────────
  // Si scores está vacío, muestra un mensaje y termina:


  /* TU CÓDIGO AQUÍ */


  // TODO #6b — Construir las filas de la tabla
  // ─────────────────────────────────────────────────────────────────────────
  // Usa scores.map() para convertir cada objeto en un string HTML <tr>.
  //
  // A diferencia de Leaderboard y Rankings, aquí NO hay medallas ni
  // resaltado de posición — todas las filas son iguales.
  //
  // Columnas de cada fila:
  //   <td> número de posición: </td>
  //   <td> puntaje con separador de miles: </td>
  //   <td> "Nv. X" donde X es el nivel </td>
  //   <td class="date"> primeros 10 caracteres de la fecha: </td>
  //
  // Al final del map usa .join('') para unir todas las filas.

  const rows = /* TU CÓDIGO AQUÍ → scores.map((s, i) => `...`).join('') */ '';


  // TODO #6c — Inyectar la tabla completa en #history-content
  // ─────────────────────────────────────────────────────────────────────────
  // La tabla tiene 4 columnas: #, Puntaje, Nivel, Fecha
  

  /* TU CÓDIGO AQUÍ */
}
