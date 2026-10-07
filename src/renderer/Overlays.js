// ── Overlays.js ───────────────────────────────────────────────────────────────
import { W, H }      from '../utils/constants.js';
import { gameState } from '../core/GameState.js';
import { gameLoop }  from '../core/GameLoop.js';

export function drawOverlay(ctx) {
  const { screen } = gameState;

  // ── Pausa ──────────────────────────────────────────────────────────────────
  if (gameLoop.isPaused) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, W, H);
    return;   // el menú de pausa lo dibuja el DOM, no el canvas
  }

  // ── Game Over ──────────────────────────────────────────────────────────────
  if (screen === 'gameover') {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font      = 'bold 46px monospace';
    ctx.fillText('GAME OVER', W / 2, H / 2 - 20);

    ctx.font      = '16px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Redirigiendo…', W / 2, H / 2 + 20);
  }
}
