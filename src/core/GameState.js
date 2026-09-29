// ── GameState.js ──────────────────────────────────────────────────────────────
import { INITIAL_LIVES } from '../utils/constants.js';

export class GameState {
  constructor() {
    this.user = null;
    this.resetGame();
  }

  resetGame() {
    this.ship          = null;
    this.bullets       = [];
    this.asteroids     = [];
    this.particles     = [];
    this.powerups      = [];
    this.shootingStars = [];

    this.score  = 0;
    this.lives  = INITIAL_LIVES;
    this.level  = 1;
    this.screen = 'playing';

    this.deadTimer         = 0;
    this.shootingStarTimer = 0;
  }

  setUser(user)    { this.user = user; }
  clearUser()      { this.user = null; }
  get isLoggedIn() { return !!this.user; }

  // ── Guardar snapshot de la partida en localStorage ────────────────────────
  // Solo guarda los datos primitivos necesarios para reanudar:
  // posición/velocidad de la nave, asteroides, score, nivel, vidas y timers.
  // Las partículas y balas se descartan (no son críticas).
  saveSnapshot(asteroidsDestroyed, timePlayed) {
    const snap = {
      score:  this.score,
      lives:  this.lives,
      level:  this.level,
      screen: this.screen,
      shootingStarTimer: this.shootingStarTimer,
      asteroidsDestroyed,
      timePlayed,

      ship: this.ship ? {
        x: this.ship.x, y: this.ship.y,
        angle: this.ship.angle,
        vx: this.ship.vx, vy: this.ship.vy,
        shieldTimer: this.ship.shieldTimer,
        tripleTimer: this.ship.tripleTimer,
        rapidTimer:  this.ship.rapidTimer,
      } : null,

      asteroids: this.asteroids.map(a => ({
        x: a.x, y: a.y,
        vx: a.vx, vy: a.vy,
        rot: a.rot, rotSpeed: a.rotSpeed,
        size: a.size,
        verts: a.verts,
      })),
    };
    localStorage.setItem('saved_game', JSON.stringify(snap));
  }

  clearSnapshot() {
    localStorage.removeItem('saved_game');
  }

  static loadSnapshot() {
    const raw = localStorage.getItem('saved_game');
    return raw ? JSON.parse(raw) : null;
  }
}

export const gameState = new GameState();
