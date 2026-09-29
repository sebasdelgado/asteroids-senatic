// ── GameLoop.js ───────────────────────────────────────────────────────────────
class GameLoop {
  constructor() {
    this._lastTime = null;
    this._rafId    = null;
    this._running  = false;
    this._paused   = false;
  }

  start(onUpdate, onDraw) {
    this._onUpdate = onUpdate;
    this._onDraw   = onDraw;
    this._running  = true;
    this._paused   = false;
    this._rafId    = requestAnimationFrame(ts => this._tick(ts));
  }

  stop() {
    this._running  = false;
    this._lastTime = null;
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  pause() {
    this._paused   = true;
    this._lastTime = null;   // evita dt enorme al reanudar
  }

  resume() {
    if (!this._paused) return;
    this._paused   = false;
    this._lastTime = null;
    this._rafId    = requestAnimationFrame(ts => this._tick(ts));
  }

  get isPaused() { return this._paused; }

  _tick(ts) {
    if (!this._running || this._paused) return;
    const dt = this._lastTime === null
      ? 0
      : Math.min((ts - this._lastTime) / 1000, 0.05);
    this._lastTime = ts;
    // TODO: Descomentar
    // this._onUpdate(dt);
    this._onDraw();
    this._rafId = requestAnimationFrame(ts2 => this._tick(ts2));
  }
}

export const gameLoop = new GameLoop();
