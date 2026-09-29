
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


function renderHistory(scores) {
  
  const el = document.getElementById('history-content');

  if( !scores.length ) {
    el.textContent = 'Aún no has jugado ninguna partida';
    return;
  }

  const rows =  scores.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${s.score.toLocaleString()}</td>
      <td>Nv. ${s.level}</td>
      <td class="date">${s.date.slice(0,10)}</td>
    </tr>
  `).join('');

  el.innerHTML =`
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Puntaje</th>
          <th>Nivel</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;


}
