const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
//const saved = localStorage.getItem('saved_game') ? JSON.parse(localStorage.getItem('saved_game')) : null;

//-- Saludo --------------
if(user) {
    document.getElementById('home-username').textContent = `Hola, ${user.username}`;
    document.getElementById('btn-profile').classList.remove('hidden');
    document.getElementById('btn-achievements').classList.remove('hidden');
} else {
    document.getElementById('btn-logout').textContent = 'Iniciar sesión';
}

const saved = {
  "score": 4200,
  "lives": 2,
  "level": 4
}

//----Partida Guardada -----------------
if(saved) {
    const el = document.getElementById('saved-game');
    el.classList.remove('hidden');

    document.getElementById('saved-info').textContent =
        `Partida guardada - Puntaje: ${saved.score.toLocaleString()} Nivel: ${saved.level}`;
}

//-- Botones -------------------
document.getElementById('btn-play').addEventListener('click', () => {
    //Limpiar partida guardada al empezar una nueva
    localStorage.removeItem('saved_game');
    window.location.href = 'game.html';
});

document.getElementById('btn-continue')?.addEventListener('click', () => {
    window.location.href = 'game.html?resume=1';
});

document.getElementById('btn-discard')?.addEventListener('click', () => {
    localStorage.removeItem('saved_game');
    document.getElementById('saved-game').classList.add('hidden');
});

document.getElementById('btn-leaderboard').addEventListener('click', () => {
  window.location.href = 'leaderboard.html';
});

document.getElementById('btn-rankings').addEventListener('click', () => {
  window.location.href = 'rankings.html';
});

document.getElementById('btn-profile').addEventListener('click', () => {
  window.location.href = 'profile.html';
});

document.getElementById('btn-achievements').addEventListener('click', () => {
  window.location.href = 'achievements.html';
});

document.getElementById('btn-logout').addEventListener('click', () => {

    if(!user) {
        window.location.href = '../index.html';
        return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  
});


