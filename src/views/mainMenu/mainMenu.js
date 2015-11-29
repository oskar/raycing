require('./mainMenu.css');
var ClickListenerHandler = require('../clickListenerHandler');

export default class MainMenu {
  constructor(onDone, params) {
    this.mainMenu = document.querySelector('#mainMenu');
    this.onDone = onDone;
    this.clickListenerHandler = new ClickListenerHandler();

    this.show();
  }

  show(){
    this.mainMenu.classList.remove('menu-hidden');

    this.clickListenerHandler.add(document.querySelector('#puzzleModeButton'), () => this.onDone({ view: 'Puzzle menu' }));
    this.clickListenerHandler.add(document.querySelector('#freeModeButton'), () => this.onDone({ view: 'Freeplay menu' }));
  }

  dispose(){
    this.clickListenerHandler.dispose();
    this.mainMenu.classList.add('menu-hidden');
  }
}
