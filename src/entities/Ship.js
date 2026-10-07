import { wrap, rand }                     from '../utils/math.js';
import { W, H,
         SHIP_ROT_SPEED, SHIP_THRUST, SHIP_DRAG, SHIP_INVINCIBLE,
         SHOOT_COOLDOWN, RAPID_COOLDOWN, TRIPLE_SPREAD }  from '../utils/constants.js';
import { Bullet }                          from './Bullet.js';
import { input }                           from '../core/InputManager.js';

export class Ship {
  constructor() { this.reset(); }

  reset() {
    this.x      = W / 2;
    this.y      = H / 2;
    this.angle  = -Math.PI / 2;
    this.vx     = 0;
    this.vy     = 0;
    this.radius = 12;
    this.thrusting     = false;
    this.invincible    = SHIP_INVINCIBLE;
    this.shootCooldown = 0;
    this.dead          = false;
    this.shieldTimer   = 0;
    this.tripleTimer   = 0;
    this.rapidTimer    = 0;
  }

  update(dt) {
    if (this.dead) return;
    if (this.invincible    > 0) this.invincible    -= dt;
    if (this.shootCooldown > 0) this.shootCooldown -= dt;
    if (this.shieldTimer   > 0) this.shieldTimer   -= dt;
    if (this.tripleTimer   > 0) this.tripleTimer   -= dt;
    if (this.rapidTimer    > 0) this.rapidTimer    -= dt;

    if (input.isDown('ArrowLeft'))  this.angle -= SHIP_ROT_SPEED * dt;
    if (input.isDown('ArrowRight')) this.angle += SHIP_ROT_SPEED * dt;

    this.thrusting = input.isDown('ArrowUp');
    if (this.thrusting) {
      this.vx += Math.cos(this.angle) * SHIP_THRUST * dt;
      this.vy += Math.sin(this.angle) * SHIP_THRUST * dt;
    }

    this.vx *= SHIP_DRAG;
    this.vy *= SHIP_DRAG;
    this.x   = wrap(this.x + this.vx * dt, W);
    this.y   = wrap(this.y + this.vy * dt, H);
  }

  tryShoot() {
    if (this.shootCooldown > 0 || this.dead) return [];
    this.shootCooldown = this.rapidTimer > 0 ? RAPID_COOLDOWN : SHOOT_COOLDOWN;
    const NOSE = 21;
    const ox = this.x + Math.cos(this.angle) * NOSE;
    const oy = this.y + Math.sin(this.angle) * NOSE;
    const result = [new Bullet(ox, oy, this.angle)];
    if (this.tripleTimer > 0) {
      result.push(new Bullet(ox, oy, this.angle - TRIPLE_SPREAD));
      result.push(new Bullet(ox, oy, this.angle + TRIPLE_SPREAD));
    }
    return result;
  }

  applyPowerup(type) {
    if (type === 'shield') this.shieldTimer = 6;
    if (type === 'triple') this.tripleTimer = 10;
    if (type === 'rapid')  this.rapidTimer  = 10;
  }

  draw(ctx) {
    if (this.dead) return;
    if (this.invincible > 0 && Math.floor(this.invincible * 8) % 2 === 0) return;

    // Escudo
    if (this.shieldTimer > 0) {
      const blink = this.shieldTimer < 2 && Math.floor(this.shieldTimer * 6) % 2 === 0;
      if (!blink) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'rgba(80,255,120,0.75)';
        ctx.shadowColor = '#50ff78';
        ctx.shadowBlur  = 10;
        ctx.lineWidth   = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.beginPath();
    ctx.moveTo( 20,  0);
    ctx.lineTo(-12, -9);
    ctx.lineTo( -7,  0);
    ctx.lineTo(-12,  9);
    ctx.closePath();
    ctx.stroke();

    if (this.thrusting && Math.random() > 0.35) {
      ctx.beginPath();
      ctx.moveTo(-8, -4);
      ctx.lineTo(-8 - rand(6, 14), 0);
      ctx.lineTo(-8,  4);
      ctx.strokeStyle = 'rgba(255,130,0,0.85)';
      ctx.stroke();
    }
    ctx.restore();
  }
}
