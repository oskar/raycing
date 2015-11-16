var audio = require('../audio');

export default class ClickListenerHandler {
  constructor() {
    this.clickListeners = [];
  }

  add(element, onclick) {
    var callback = event => {
      audio.playClick();
      onclick(event);
    }
    element.addEventListener('click', callback);
    this.clickListeners.push({element, callback});
  }

  dispose () {
    this.clickListeners.forEach(listener => listener.element.removeEventListener('click', listener.callback));
  }
}
