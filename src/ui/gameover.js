// ── gameover.js ───────────────────────────────────────────────────────────────
const SERVER = '../server';

const raw   = localStorage.getItem('last_game');
const stats = raw ? JSON.parse(raw) : null;
const token = localStorage.getItem('token');

if (stats) {
  document.getElementById('stat-score').textContent     = stats.score.toLocaleString();
  document.getElementById('stat-level').textContent     = stats.level;
  document.getElementById('stat-asteroids').textContent = stats.asteroidsDestroyed;
  document.getElementById('stat-time').textContent      = formatTime(stats.timePlayed);
}

// ── Comparar con mejor puntaje personal ──────────────────────────────────────
if (token && stats) {
  (async () => {
    try {
      // const res  = await fetch(`${SERVER}/my_scores.php`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const res  = await fetch('./src/data/my_scores.json');
      const data = await res.json();
      const best = data.scores[0]?.score ?? 0;
      const el   = document.getElementById('personal-best');
      const txt  = document.getElementById('personal-best-text');

      if (stats.score > best && data.scores.length > 1) {
        txt.textContent = '🎉 ¡Nuevo récord personal!';
        el.classList.add('new-record');
      } else if (best > 0) {
        txt.textContent = `Tu mejor puntaje: ${best.toLocaleString()}`;
      }
      el.classList.remove('hidden');
    } catch {}
  })();
}

// ── Guardar puntaje ───────────────────────────────────────────────────────────
if (token && stats) {
  fetch(`${SERVER}/save_score.php`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body:    JSON.stringify({
      score:               stats.score,
      level:               stats.level,
      asteroids_destroyed: stats.asteroidsDestroyed,
      time_played:         stats.timePlayed,
    }),
  }).catch(() => {});
}

// ── Botones ───────────────────────────────────────────────────────────────────
document.getElementById('btn-play-again').addEventListener('click', () => {
  window.location.href = 'game.html';
});

document.getElementById('btn-home').addEventListener('click', () => {
  window.location.href = 'home.html';
});

function formatTime(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}
