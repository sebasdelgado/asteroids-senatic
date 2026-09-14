
import { requireLogin } from "./auth-guard.js";

// Ruta base del servidor (no la cambies)
const SERVER = '../server';


//TODO: Quitar el comentario de await requireLogin
// if (await requireLogin()) {
if (true) {
  
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  if(user) {
    document.getElementById('btn-profile').classList.remove('hidden');
    document.getElementById('btn-logout').classList.remove('hidden');
  }

  document.getElementById('btn-home').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  document.getElementById('btn-rankings').addEventListener('click', () => {
    window.location.href = 'rankings.html';
  });

  document.getElementById('btn-profile').addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  });

  loadLeaderboard();

}

async function loadLeaderboard() {
  try {

    const res = await fetch('../src/data/leaderboard.json');
    const data = await res.json();
    render(data.scores);

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

  const rows = scores.map((s, i ) => `
    <tr class="${ i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}">
      <td>${medals[i] ?? i + 1}</td>
      <td>${s.username}</td>
      <td>${Number(s.score).toLocaleString()}</td>
      <td>Nv. ${s.level}</td>
      <td class="date">${s.date.slice(0, 10)}</td>
    </tr>
  `).join('');

  document.getElementById('lb-content').innerHTML = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Jugador</th>
          <th>Puntaje</th>
          <th>Nivel</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;

}
