
import { requireLogin } from './auth-guard.js';

const SERVER = '../server';


// TODO #2 — Ejecutar la lógica principal con requireLogin
// ─────────────────────────────────────────────────────────────────────────────
// Todo el código de la página va dentro de:
//   if (await requireLogin()) { ... }
//
// Dentro del if debes hacer:
//
//
//   c) Conectar los seis botones (ver TODO #3).
//
//   d) Hacer fetch al historial (ver TODO #4), dentro de try/catch.

//TODO Descomentar
// if (await requireLogin() ) {
if( true ) {

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  document.getElementById('profile-username').textContent = user.username;

  document.getElementById('btn-home').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  document.getElementById('btn-play').addEventListener('click', () => {
    window.location.href = 'game.html';
  });

  document.getElementById('btn-leaderboard').addEventListener('click', () => {
    window.location.href = 'leaderboard.html';
  });

  document.getElementById('btn-rankings').addEventListener('click', () => {
    window.location.href = 'rankings.html';
  });

  document.getElementById('btn-achievements').addEventListener('click', () => {
    window.location.href = 'achievements.html';
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  });

  try {
    // Fetch al JSON simulado
    const res = await fetch('../src/data/profile.json');
    const data = await res.json();

    renderStats(data.scores);
    renderHistory(data.scores);
  } catch {
    document.getElementById('history-content').textContent =
      'No se pudo cargar el historial.';
  }

}


function renderStats(scores) {

  if( !scores.length ) {
    document.getElementById('best-score').textContent  = '0';
    document.getElementById('best-level').textContent  = '0';
    document.getElementById('total-games').textContent = '0';
    document.getElementById('avg-score').textContent   = '0';
    return;
  }

  const best = scores[0].score;
  const maxLvl = Math.max(...scores.map(s => s.level));
  const total = scores.length;
  const avg = Math.round( scores.reduce((sum, s) => sum + s.score, 0) / total );

  document.getElementById('best-score').textContent  = best.toLocaleString();
  document.getElementById('best-level').textContent  = maxLvl;
  document.getElementById('total-games').textContent = total;
  document.getElementById('avg-score').textContent   = avg.toLocaleString();

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
