class InputManager {
  constructor() {
    this._keys        = {};
    this._justPressed = {};
    this._bound       = false;
  }

  init() {
    if (this._bound) return;
    this._bound = true;

    window.addEventListener('keydown', e => {
      this._justPressed[e.code] = !this._keys[e.code];
      this._keys[e.code] = true;
      if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))
        e.preventDefault();
    });

    window.addEventListener('keyup', e => {
      this._keys[e.code] = false;
    });
  }

  isDown(code)   { return !!this._keys[code]; }

  pressed(code) {
    const val = !!this._justPressed[code];
    this._justPressed[code] = false;
    return val;
  }
}

export const input = new InputManager();
