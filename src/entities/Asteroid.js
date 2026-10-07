import { wrap, rand, randInt }    from '../utils/math.js';
import { W, H, RADII, SPEEDS }   from '../utils/constants.js';

export class Asteroid {
  constructor(x, y, size = 3) {
    this.x      = x;
    this.y      = y;
    this.size   = size;
    this.radius = RADII[size];
    this.dead   = false;

    //  TODO: Descomentar
    // const angle = rand(0, Math.PI * 2);
    // const speed = SPEEDS[size] + rand(-15, 15);
    const angle = 0.1408313519682068;
    const speed = 26.744017417263105;
    this.vx       = Math.cos(angle) * speed;
    this.vy       = Math.sin(angle) * speed;
    //  TODO: Descomentar
    // this.rotSpeed = rand(-1.2, 1.2);
    // this.rot      = rand(0, Math.PI * 2);
    this.rotSpeed = 0;
    this.rot      = 0;
    
    //  TODO: Descomentar
    // const n = randInt(8, 13);
    const n = 8;

    //  TODO: Descomentar
    // this.verts = [];
    // for (let i = 0; i < n; i++) {
    //   const a = (i / n) * Math.PI * 2;
    //   const r = this.radius * rand(0.6, 1.0);      
    //   this.verts.push([Math.cos(a) * r, Math.sin(a) * r]);
    // }
    
    this.verts = [
      [35.25771909701399, 0],
      [22.431396415635366, 22.431396415635362],
      [1.901815289169841e-15, 31.059000692999135],
      [-27.505704836338307, 27.50570483633831],
      [-33.64484228914645, 4.120304841722071e-15],
      [-32.689255505632154, -32.68925550563214],
      [-8.608248470793943e-15, -46.8611220627713],
      [32.579042272606394, -32.57904227260641]
    ];
  }

  update(dt) {
    this.x    = wrap(this.x + this.vx * dt, W);
    this.y    = wrap(this.y + this.vy * dt, H);
    this.rot += this.rotSpeed * dt;
  }

  split() {
    if (this.size <= 1) return [];
    return [
      new Asteroid(this.x, this.y, this.size - 1),
      new Asteroid(this.x, this.y, this.size - 1),
    ];
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.beginPath();
    ctx.moveTo(this.verts[0][0], this.verts[0][1]);

    //  TODO: Descomentar
    // for (let i = 1; i < this.verts.length; i++) {
    //   ctx.lineTo(this.verts[i][0], this.verts[i][1]);
    // }
    
    
    ctx.lineTo(22.431396415635366,22.431396415635362);
    ctx.lineTo(1.901815289169841e-15,31.059000692999135);
    ctx.lineTo(-27.505704836338307,27.50570483633831);
    ctx.lineTo(-33.64484228914645,4.120304841722071e-15);
    ctx.lineTo(-32.689255505632154,-32.68925550563214);
    ctx.lineTo(-8.608248470793943e-15,-46.8611220627713);
    ctx.lineTo(32.579042272606394,-32.57904227260641);

    ctx.closePath();
    ctx.stroke();
    ctx.restore();


  }
}
