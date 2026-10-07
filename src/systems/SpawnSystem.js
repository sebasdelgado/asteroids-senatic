import { rand } from '../utils/math.js';
import { W, H,
        SAFE_SPAWN_DIST, INITIAL_ASTEROIDS,
        SHOOTING_STAR_INTERVAL_MIN,
        SHOOTING_STAR_INTERVAL_MAX } from '../utils/constants.js';
import { Asteroid } from '../entities/Asteroid.js';
// import { ShootingAsteroid } from '../entities/ShootingAsteroid.js';
import { gameState } from '../core/GameState.js';

export const SpawnSystem = {

    spawnAsteroids( count ) {

        for (let i = 0; i < count; i++) {
            let x, y;

            do {
                // TODO: Descomentar
                // x = rand(0, W);
                // y = rand(0, H);
                x = 200;
                y = 278
            } while (Math.hypot(x - W/2, y - H/2) < SAFE_SPAWN_DIST);

            gameState.asteroids.push(new Asteroid(x, y, 3));
        }
    },

    initLevel() {
        gameState.shootingStarTimer = rand (
            SHOOTING_STAR_INTERVAL_MIN,
            SHOOTING_STAR_INTERVAL_MAX
        );
        //TODO: Descomentar
        // this.spawnAsteroids( INITIAL_ASTEROIDS + ( gameState.level - 1 ) * 1);
        this.spawnAsteroids(1);
        //TODO QUITAR
        // gameState.shootingStars.push(new ShootingAsteroid());
    },

    update(dt) {
    if (gameState.shootingStarTimer > 0) {
      gameState.shootingStarTimer -= dt;
      if (gameState.shootingStarTimer <= 0 && gameState.shootingStars.length === 0) {
        gameState.shootingStars.push(new ShootingAsteroid());
        // Reiniciar timer para la próxima estrella
        gameState.shootingStarTimer = rand(
          SHOOTING_STAR_INTERVAL_MIN,
          SHOOTING_STAR_INTERVAL_MAX
        );
      }
    }
  },

}