import { W, H }        from '../utils/constants.js';
import { gameState }    from '../core/GameState.js';
//  TODO: Descomentar
// import { drawHUD }      from './HUD.js';
// import { drawOverlay }  from './Overlays.js';

export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    canvas.width  = W;
    canvas.height = H;
  }

  draw() {
    const ctx = this.ctx;
    const { particles, shootingStars, powerups, asteroids, bullets, ship, screen } = gameState;

    // Fondo
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Entidades
    particles.forEach(p => p.draw(ctx));
    shootingStars.forEach(s => s.draw(ctx));
    powerups.forEach(p => p.draw(ctx));
    asteroids.forEach(a => a.draw(ctx));
    bullets.forEach(b => b.draw(ctx));
    if (ship) ship.draw(ctx);

    // UI sobre el canvas
    if (screen !== 'login' && screen !== 'leaderboard') {
      //  TODO: Descomentar
      // drawHUD(ctx);
    }
    if (screen === 'gameover') {
      //  TODO: Descomentar
      // drawOverlay(ctx);
    }
  }
}
