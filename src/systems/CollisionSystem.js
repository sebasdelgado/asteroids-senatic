import { dist }             from '../utils/math.js';
import { POINTS,
         STREAK_POINTS,
         PU_DROP_CHANCE }   from '../utils/constants.js';
import { Particle }         from '../entities/Particle.js';
import { PowerUp }          from '../entities/PowerUp.js';
import { gameState }        from '../core/GameState.js';

function explode(x, y, count = 8) {
  for (let i = 0; i < count; i++)
    gameState.particles.push(new Particle(x, y));
}

function killShip() {
  explode(gameState.ship.x, gameState.ship.y, 14);
  gameState.ship.dead = true;
  gameState.lives--;

  if (gameState.lives <= 0) {
    gameState.screen = 'gameover';
  } else {
    gameState.screen    = 'dead';
    gameState.deadTimer = 2;
  }
}

export const CollisionSystem = {

  // Devuelve cuántos asteroides fueron impactados por una bala en este frame.
  update() {
    const { ship, bullets, asteroids, shootingStars, powerups } = gameState;

    // ── Bala vs Asteroide ─────────────────────────────────────────────────────
    const newAsteroids = [];
    let destroyed = 0;
    for (const b of bullets) {
      for (const a of asteroids) {
        if (!a.dead && !b.dead && dist(b, a) < a.radius) {
          b.dead = true;
          a.dead = true;
          destroyed++;
          gameState.score += POINTS[a.size];
          explode(a.x, a.y, a.size * 5);
          newAsteroids.push(...a.split());
          if (Math.random() < PU_DROP_CHANCE)
            gameState.powerups.push(new PowerUp(a.x, a.y));
        }
      }
    }
    gameState.asteroids = asteroids.filter(a => !a.dead).concat(newAsteroids);
    gameState.bullets   = bullets.filter(b => !b.dead);

    // ── Bala vs Estrella fugaz ────────────────────────────────────────────────
    for (const b of gameState.bullets) {
      for (const s of shootingStars) {
        if (!s.dead && !b.dead && dist(b, s) < s.radius) {
          b.dead = true;
          s.dead = true;
          gameState.score += STREAK_POINTS;
          gameState.starsDestroyed++;
          explode(s.x, s.y, 14);
        }
      }
    }
    gameState.shootingStars = shootingStars.filter(s => !s.dead);
    gameState.bullets       = gameState.bullets.filter(b => !b.dead);

    // ── Nave vs Power-up ──────────────────────────────────────────────────────
    for (const p of powerups) {
      if (!p.dead && dist(ship, p) < ship.radius + p.radius) {
        ship.applyPowerup(p.type);
        if (p.type === 'shield') gameState.shieldsCollected++;
        p.dead = true;
      }
    }
    gameState.powerups = powerups.filter(p => !p.dead);

    // ── Nave vs Asteroide / Estrella (con escudo) ─────────────────────────────
    if (ship.invincible <= 0 && ship.shieldTimer <= 0 && !ship.dead) {
      for (const a of gameState.asteroids) {
        if (dist(ship, a) < ship.radius + a.radius * 0.82) {
          killShip(); return destroyed;
        }
      }
      for (const s of gameState.shootingStars) {
        if (dist(ship, s) < ship.radius + s.radius * 0.82) {
          killShip(); return destroyed;
        }
      }
    }
    return destroyed;
  },
};
