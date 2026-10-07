import { W, H } from '../utils/constants.js';

// Versión de ShootingAsteroid con valores fijos (sin aleatoriedad):
// siempre entra por la izquierda, a la misma altura y con la misma forma.
export class ShootingAsteroidEstatico {
  constructor() {
    const x     = -20;
    const y     = 200;
    const angle = 0.3;

    this.x = x; this.y = y;
    this.radius = 13;
    this.dead   = false;

    const speed   = 260;
    this.vx       = Math.cos(angle) * speed;
    this.vy       = Math.sin(angle) * speed;
    this.rot      = 0;
    this.rotSpeed = 4;

    const factores = [0.95, 0.6, 0.85, 0.55, 0.9, 0.7];
    const n = factores.length;
    this.verts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = this.radius * factores[i];
      this.verts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }

    this.trail     = [];
    this.TRAIL_LEN = 24;
  }

  update(dt) {
    this.trail.unshift({ x: this.x, y: this.y });
    if (this.trail.length > this.TRAIL_LEN) this.trail.pop();
    this.x   += this.vx * dt;
    this.y   += this.vy * dt;
    this.rot += this.rotSpeed * dt;
    if (this.x < -80 || this.x > W+80 || this.y < -80 || this.y > H+80)
      this.dead = true;
  }

  split() { return []; }

  draw(ctx) {
    for (let i = 0; i < this.trail.length; i++) {
      const t = i / this.trail.length;
      const alpha = (1 - t) * 0.6;
      const r = (1 - t) * this.radius * 0.6;
      if (r < 0.5) continue;
      ctx.beginPath();
      ctx.arc(this.trail[i].x, this.trail[i].y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100,210,255,${alpha.toFixed(2)})`;
      ctx.fill();
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.strokeStyle = '#5cf';
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';
    ctx.shadowColor = '#5cf';
    ctx.shadowBlur  = 14;
    ctx.beginPath();
    ctx.moveTo(this.verts[0][0], this.verts[0][1]);
    for (let i = 1; i < this.verts.length; i++)
      ctx.lineTo(this.verts[i][0], this.verts[i][1]);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
