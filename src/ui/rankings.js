
const SERVER = '../server';

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

if (user) {
  document.getElementById('btn-profile').classList.remove('hidden');
}

let currentPeriod = 'all';

loadRankings(currentPeriod);

document.getElementById('btn-home').addEventListener('click', () => { 
  window.location.href = 'home.html'; 
});

document.getElementById('btn-profile').addEventListener('click', () => { 
  window.location.href = 'profile.html'; 
});

document.querySelectorAll('.filter-btn').forEach( btn => {
  btn.addEventListener('click', () => {
    
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
    });

    btn.classList.add('active');
    currentPeriod = btn.dataset.period;
    loadRankings(currentPeriod);

  });
});

// ─────────────────────────────────────────────────────────────────────────────
// loadRankings — carga los rankings del período indicado
// ─────────────────────────────────────────────────────────────────────────────

async function loadRankings(period) {
  const el = document.getElementById('rankings-content');
  el.textContent = 'Cargando…';

  try {

    const res = await fetch('../src/data/rankings.json');
    const data = await res.json();
    render(data.scores, period);

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

  if(!scores.length) {
    const labels = { all: 'registrados', week: 'esta semana', today: 'hoy'};
    el.textContent = `No hay puntajes ${labels[period]}`;
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

  el.innerHTML = `
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
