import { rand, randInt }            from '../utils/math.js';
import { W, H, STREAK_SPEED }      from '../utils/constants.js';

export class ShootingAsteroid {
  constructor() {
    const edge = randInt(0, 3);
    let x, y, angle;

    if (edge === 0)      { x = rand(50, W-50); y = -20;   angle = rand(Math.PI*0.15, Math.PI*0.85); }
    else if (edge === 1) { x = W+20; y = rand(50, H-50);  angle = rand(Math.PI*0.65, Math.PI*1.35); }
    else if (edge === 2) { x = rand(50, W-50); y = H+20;  angle = rand(Math.PI*1.15, Math.PI*1.85); }
    else                 { x = -20; y = rand(50, H-50);   angle = rand(-Math.PI*0.35, Math.PI*0.35); }

    this.x = x; this.y = y;
    this.radius = 13;
    this.dead   = false;

    const speed   = STREAK_SPEED + rand(-40, 70);
    this.vx       = Math.cos(angle) * speed;
    this.vy       = Math.sin(angle) * speed;
    this.rot      = rand(0, Math.PI * 2);
    this.rotSpeed = rand(3, 6) * (Math.random() < 0.5 ? 1 : -1);

    const n = randInt(5, 8);
    this.verts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const r = this.radius * rand(0.55, 0.95);
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
