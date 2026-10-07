import { wrap, rand, randInt }                    from '../utils/math.js';
import { W, H, PU_TYPES, PU_SIDES, PU_LABELS }   from '../utils/constants.js';

export class PowerUp {
  constructor(x, y) {
    this.x    = x;
    this.y    = y;
    this.type = PU_TYPES[randInt(0, PU_TYPES.length - 1)];
    this.radius   = 12;
    this.ttl  = 10;
    this.life = 10;
    this.rot  = rand(0, Math.PI * 2);
    this.rotSpeed = rand(0.6, 1.4) * (Math.random() < 0.5 ? 1 : -1);
    const angle = rand(0, Math.PI * 2);
    const speed = rand(20, 45);
    this.vx   = Math.cos(angle) * speed;
    this.vy   = Math.sin(angle) * speed;
    this.dead = false;
  }

  update(dt) {
    this.x    = wrap(this.x + this.vx * dt, W);
    this.y    = wrap(this.y + this.vy * dt, H);
    this.rot += this.rotSpeed * dt;
    this.ttl -= dt;
    if (this.ttl <= 0) this.dead = true;
  }

  draw(ctx) {
    if (this.ttl < 3 && Math.floor(this.ttl * 6) % 2 === 0) return;
    const sides = PU_SIDES[this.type];
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.strokeStyle = '#ffe600';
    ctx.lineWidth   = 2.5;
    ctx.lineJoin    = 'round';
    ctx.shadowColor = '#ffe600';
    ctx.shadowBlur  = 8;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
      const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(a) * this.radius;
      const y = Math.sin(a) * this.radius;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur   = 0;
    ctx.fillStyle    = '#ffe600';
    ctx.font         = 'bold 9px monospace';
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(PU_LABELS[this.type], 0, 0);
    ctx.restore();
  }
}
