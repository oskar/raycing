require('./mainMenu.css');
var ClickListenerHandler = require('../clickListenerHandler');

export default class MainMenu {
  constructor(onDone, params) {
    this.mainMenu = document.querySelector('#mainMenu');
    this.mainMenu.style.visibility = 'visible';

    this.clickListenerHandler = new ClickListenerHandler();
    this.clickListenerHandler.add(document.querySelector('#puzzleModeButton'), () => onDone({ view: 'Puzzle menu' }));
    this.clickListenerHandler.add(document.querySelector('#freeModeButton'), () => onDone({ view: 'Freeplay menu' }));
  }

  dispose(){
    this.clickListenerHandler.dispose();
    this.mainMenu.style.visibility = '';
  }
}
