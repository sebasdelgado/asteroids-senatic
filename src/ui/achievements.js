// ── achievements.js ───────────────────────────────────────────────────────────
import { requireLogin } from './auth-guard.js';

const SERVER = '../server';

const ALL_ACHIEVEMENTS = [
  { id: 'first_game',     icon: '🚀', title: 'Primera partida',      desc: 'Juega tu primera partida'               },
  { id: 'score_1000',     icon: '⭐', title: 'Mil puntos',            desc: 'Alcanza 1.000 puntos en una partida'   },
  { id: 'score_5000',     icon: '🌟', title: 'Cinco mil puntos',      desc: 'Alcanza 5.000 puntos en una partida'   },
  { id: 'score_10000',    icon: '💫', title: 'Diez mil puntos',       desc: 'Alcanza 10.000 puntos en una partida'  },
  { id: 'level_5',        icon: '🔥', title: 'Nivel 5',               desc: 'Llega al nivel 5'                      },
  { id: 'level_10',       icon: '💥', title: 'Nivel 10',              desc: 'Llega al nivel 10'                     },
  { id: 'survive_3min',   icon: '⏱️', title: 'Sobreviviente',         desc: 'Sobrevive 3 minutos en una partida'    },
  { id: 'survive_5min',   icon: '⌛', title: 'Resistencia',           desc: 'Sobrevive 5 minutos en una partida'    },
  { id: 'destroy_50',     icon: '💣', title: 'Destructor',            desc: 'Destruye 50 asteroides en una partida' },
  { id: 'destroy_100',    icon: '☄️', title: 'Exterminador',          desc: 'Destruye 100 asteroides en total'      },
  { id: 'shoot_star',     icon: '🌠', title: 'Cazador de estrellas',  desc: 'Destruye una estrella fugaz'           },
  { id: 'powerup_shield', icon: '🛡️', title: 'Escudo activado',       desc: 'Recoge un power-up de escudo'          },
  { id: 'games_10',       icon: '🎮', title: 'Jugador habitual',      desc: 'Juega 10 partidas'                     },
  { id: 'games_50',       icon: '🏅', title: 'Veterano',              desc: 'Juega 50 partidas'                     },
];

if (await requireLogin()) {

  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user'));

  if (user) {
    document.getElementById('btn-profile').classList.remove('hidden');
  }

  document.getElementById('btn-home').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  document.getElementById('btn-play').addEventListener('click', () => {
    window.location.href = 'game.html';
  });

  document.getElementById('btn-profile').addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  try {
    const res  = await fetch(`${SERVER}/achievements.php`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    render(data.unlocked);
  } catch {
    document.getElementById('achievements-grid').textContent = 'No se pudieron cargar los logros.';
  }
}

function render(unlocked) {
  const unlockedSet = new Set(unlocked.map(a => a.id));
  document.getElementById('ach-count').textContent = `${unlockedSet.size} / ${ALL_ACHIEVEMENTS.length}`;

  document.getElementById('achievements-grid').innerHTML = ALL_ACHIEVEMENTS.map(a => {
    const done = unlockedSet.has(a.id);
    return `
      <div class="ach-card ${done ? 'unlocked' : 'locked'}">
        <span class="ach-icon">${done ? a.icon : '🔒'}</span>
        <div class="ach-info">
          <strong>${done ? a.title : '???'}</strong>
          <span>${done ? a.desc : 'Logro bloqueado'}</span>
        </div>
      </div>
    `;
  }).join('');
}
