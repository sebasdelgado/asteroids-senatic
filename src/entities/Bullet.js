import { wrap }                          from '../utils/math.js';
import { W, H, BULLET_SPEED, BULLET_TTL } from '../utils/constants.js';

export class Bullet {
  constructor(x, y, angle) {
    this.x      = x;
    this.y      = y;
    this.vx     = Math.cos(angle) * BULLET_SPEED;
    this.vy     = Math.sin(angle) * BULLET_SPEED;
    this.ttl    = BULLET_TTL;
    this.radius = 2;
    this.dead   = false;
  }

  update(dt) {
    this.x    = wrap(this.x + this.vx * dt, W);
    this.y    = wrap(this.y + this.vy * dt, H);
    this.ttl -= dt;
    if (this.ttl <= 0) this.dead = true;
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}
