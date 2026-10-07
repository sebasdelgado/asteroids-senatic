// ── HUD.js ────────────────────────────────────────────────────────────────────
import { W, H }      from '../utils/constants.js';
import { gameState } from '../core/GameState.js';
import { gameLoop }  from '../core/GameLoop.js';

function drawLifeIcon(ctx, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth   = 1.2;
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.moveTo( 9,  0);
  ctx.lineTo(-6, -5);
  ctx.lineTo(-3,  0);
  ctx.lineTo(-6,  5);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

export function drawHUD(ctx) {
  if (gameLoop.isPaused) return;   // no dibujar HUD mientras está pausado

  const { score, level, lives, ship } = gameState;

  ctx.fillStyle = '#fff';
  ctx.font      = '15px monospace';

  ctx.textAlign = 'left';
  ctx.fillText(`SCORE  ${score}`, 14, 26);

  ctx.textAlign = 'center';
  ctx.fillText(`NIVEL ${level}`, W / 2, 26);

  for (let i = 0; i < lives; i++)
    drawLifeIcon(ctx, W - 16 - i * 22, 18);

  // Power-ups activos
  const active = [
    { key: 'shieldTimer', label: 'S' },
    { key: 'tripleTimer', label: 'T' },
    { key: 'rapidTimer',  label: 'R' },
  ].filter(p => ship && ship[p.key] > 0);

  active.forEach((p, i) => {
    const t     = Math.ceil(ship[p.key]);
    const blink = ship[p.key] < 2 && Math.floor(ship[p.key] * 6) % 2 === 0;
    if (blink) return;
    ctx.textAlign = 'left';
    ctx.font      = '13px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText(`[${p.label}] ${t}s`, 14, H - 14 - i * 18);
  });

  // Usuario logueado
  if (gameState.isLoggedIn) {
    ctx.textAlign = 'right';
    ctx.font      = '11px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(gameState.user.username, W - 14, 44);
  }

  // Indicador tecla P para pausar
  ctx.textAlign = 'left';
  ctx.font      = '11px monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.25)';
  ctx.fillText('[P] pausa', 14, H - 14 - active.length * 18 - 4);
}
