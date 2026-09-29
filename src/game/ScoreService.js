// ── ScoreService.js ───────────────────────────────────────────────────────────
// Guarda puntajes en el servidor.
// Usado por game.html al terminar una partida.

const SERVER = 'server';

export const ScoreService = {

  async saveScore(score, level) {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`${SERVER}/save_score.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score, level }),
      });
    } catch (e) {
      console.error('No se pudo guardar el puntaje:', e);
    }
  },
};
