// ── game.js ───────────────────────────────────────────────────────────────────
import { gameLoop }             from '../core/GameLoop.js';
import { gameState, GameState } from '../core/GameState.js';
import { input }                from '../core/InputManager.js';
import { Renderer }             from '../renderer/Renderer.js';
import { SpawnSystem }          from '../systems/SpawnSystem.js';
//  TODO: Descomentar
// import { CollisionSystem }      from '../systems/CollisionSystem.js';
// import { Ship }                 from '../entities/Ship.js';
import { Asteroid }             from '../entities/Asteroid.js';
import { rand }                 from '../utils/math.js';
import {
  INITIAL_ASTEROIDS,
  SHOOTING_STAR_INTERVAL_MIN,
  SHOOTING_STAR_INTERVAL_MAX,
} from '../utils/constants.js';

// ── Restaurar sesión ──────────────────────────────────────────────────────────
const token    = localStorage.getItem('token');
const userData = localStorage.getItem('user');
if (token && userData) {
  gameState.setUser({ ...JSON.parse(userData), token });
}

// ── Setup ─────────────────────────────────────────────────────────────────────
const canvas   = document.getElementById('canvas');
const renderer = new Renderer(canvas);
input.init();

// ── Estadísticas de la partida ────────────────────────────────────────────────
let asteroidsDestroyed = 0;
let gameStartTime      = null;
let accumulatedTime    = 0;

// ── Pausa — solo tecla P ──────────────────────────────────────────────────────
const pauseMenu = document.getElementById('pause-menu');

function showPauseMenu() {
  gameLoop.pause();
  pauseMenu.classList.remove('hidden');
}

function hidePauseMenu() {
  pauseMenu.classList.add('hidden');
  gameLoop.resume();
}

document.getElementById('btn-resume').addEventListener('click', hidePauseMenu);

document.getElementById('btn-save-quit').addEventListener('click', () => {
  const elapsed = accumulatedTime + Math.floor((Date.now() - gameStartTime) / 1000);
  gameState.saveSnapshot(asteroidsDestroyed, elapsed);
  window.location.href = 'home.html';
});

document.getElementById('btn-quit').addEventListener('click', () => {
  gameState.clearSnapshot();
  window.location.href = 'home.html';
});

// ── Helpers de partida ────────────────────────────────────────────────────────
function startGame() {
  gameState.resetGame();
  gameState.screen   = 'playing';
  //  TODO: Descomentar
  // gameState.ship     = new Ship();
  gameStartTime      = Date.now();
  asteroidsDestroyed = 0;
  accumulatedTime    = 0;
  //  TODO: Descomentar
  // SpawnSystem.initLevel();
  gameLoop.start(update, draw);
}

// ── Reanudar partida guardada ─────────────────────────────────────────────────
function resumeGame(snap) {
  gameState.resetGame();
  gameState.score  = snap.score;
  gameState.lives  = snap.lives;
  gameState.level  = snap.level;
  gameState.screen = 'playing';
  gameState.shootingStarTimer = snap.shootingStarTimer;
  accumulatedTime    = snap.timePlayed ?? 0;
  asteroidsDestroyed = snap.asteroidsDestroyed ?? 0;

  gameState.ship = new Ship();
  if (snap.ship) {
    gameState.ship.x           = snap.ship.x;
    gameState.ship.y           = snap.ship.y;
    gameState.ship.angle       = snap.ship.angle;
    gameState.ship.vx          = snap.ship.vx;
    gameState.ship.vy          = snap.ship.vy;
    gameState.ship.shieldTimer = snap.ship.shieldTimer;
    gameState.ship.tripleTimer = snap.ship.tripleTimer;
    gameState.ship.rapidTimer  = snap.ship.rapidTimer;
  }

  gameState.asteroids = snap.asteroids.map(a => {
    const ast    = new Asteroid(a.x, a.y, a.size);
    ast.vx       = a.vx;
    ast.vy       = a.vy;
    ast.rot      = a.rot;
    ast.rotSpeed = a.rotSpeed;
    ast.verts    = a.verts;
    return ast;
  });

  gameStartTime = Date.now();
  gameLoop.start(update, draw);
}

function nextLevel() {
  gameState.level++;
  gameState.bullets       = [];
  gameState.particles     = [];
  gameState.powerups      = [];
  gameState.shootingStars = [];
  gameState.ship.reset();
  gameState.shootingStarTimer = rand(
    SHOOTING_STAR_INTERVAL_MIN,
    SHOOTING_STAR_INTERVAL_MAX
  );
  SpawnSystem.spawnAsteroids(INITIAL_ASTEROIDS + gameState.level - 1);
}

function goToGameOver() {
  gameLoop.stop();
  const elapsed = accumulatedTime + Math.floor((Date.now() - gameStartTime) / 1000);
  localStorage.setItem('last_game', JSON.stringify({
    score: gameState.score,
    level: gameState.level,
    asteroidsDestroyed,
    timePlayed: elapsed,
  }));
  gameState.clearSnapshot();
  window.location.href = 'gameover.html';
}

// ── Update ────────────────────────────────────────────────────────────────────
function update(dt) {
  // Tecla P para pausar/reanudar
  if (input.pressed('KeyP') && gameState.screen === 'playing') {
    gameLoop.isPaused ? hidePauseMenu() : showPauseMenu();
    return;
  }

  const s = gameState.screen;

  if (s === 'gameover') { goToGameOver(); return; }

  if (s === 'dead') {
    gameState.deadTimer -= dt;
    gameState.particles.forEach(p => p.update(dt));
    gameState.particles     = gameState.particles.filter(p => !p.dead);
    gameState.asteroids.forEach(a => a.update(dt));
    gameState.powerups.forEach(p => p.update(dt));
    gameState.powerups      = gameState.powerups.filter(p => !p.dead);
    gameState.shootingStars.forEach(s => s.update(dt));
    gameState.shootingStars = gameState.shootingStars.filter(s => !s.dead);
    if (gameState.deadTimer <= 0) {
      gameState.screen = 'playing';
      gameState.ship.reset();
    }
    return;
  }

  // ── playing ───────────────────────────────────────────────────────────────
  if (input.pressed('Space')) gameState.bullets.push(...gameState.ship.tryShoot());
  
  //  TODO: Descomentar
  // SpawnSystem.update(dt);
  // gameState.ship.update(dt);
  gameState.bullets.forEach(b => b.update(dt));
  gameState.asteroids.forEach(a => a.update(dt));
  gameState.particles.forEach(p => p.update(dt));
  gameState.powerups.forEach(p => p.update(dt));
  gameState.shootingStars.forEach(s => s.update(dt));

  const prevCount     = gameState.asteroids.length;
  gameState.bullets       = gameState.bullets.filter(b => !b.dead);
  gameState.particles     = gameState.particles.filter(p => !p.dead);
  gameState.powerups      = gameState.powerups.filter(p => !p.dead);
  gameState.shootingStars = gameState.shootingStars.filter(s => !s.dead);

  //  TODO: Descomentar
  // CollisionSystem.update();

  const destroyed = prevCount - gameState.asteroids.filter(a => !a.dead).length;
  if (destroyed > 0) asteroidsDestroyed += destroyed;

  if (gameState.asteroids.length === 0) nextLevel();
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw() { renderer.draw(); }

// ── Arrancar ──────────────────────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
const snap   = GameState.loadSnapshot();

if (params.get('resume') === '1' && snap) {
  resumeGame(snap);
} else {
  startGame();
}
