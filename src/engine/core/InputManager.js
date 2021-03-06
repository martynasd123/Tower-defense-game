/**
 * Input manager class to manage key events.
 */
export class InputManager {

  constructor(initialKeys = {}) {
    this.keys = {};
    this.keyMap = new Map()

    Object.keys(initialKeys).forEach((key) => {
      this.keys[key] = { down: false, justPressed: false };
      initialKeys[key].forEach(keyCode => {
        this.keyMap[keyCode] = key;
      })
    })

    const setKey = (keyName, pressed) => {
      const keyState = this.keys[keyName];
      keyState.justPressed = pressed && !keyState.down;
      keyState.down = pressed;
    };

    const setKeyFromKeyCode = (keyCode, pressed) => {
      const keyName = this.keyMap[keyCode];
      if (!keyName) {
        return;
      }
      setKey(keyName, pressed);
    };

    window.addEventListener('keydown', (e) => {
      setKeyFromKeyCode(e.code, true);
    });
    window.addEventListener('keyup', (e) => {
      setKeyFromKeyCode(e.code, false);
    });
  }

  addKey(keyCode, name) {
      this.keys[name] = { down: false, justPressed: false };
      this.keyMap.set(keyCode, name);
  }

  update() {
    for (const keyState of Object.values(this.keys)) {
      if (keyState.justPressed) {
        keyState.justPressed = false;
      }
    }
  }
}