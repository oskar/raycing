require('./settingsMenu.css')
var storage = require('../../storage');
var ClickListenerHandler = require('../clickListenerHandler');

export default class SettingsMenu{
  constructor(onDone, params){
    var clickListenerHandler = new ClickListenerHandler();
    this.settingsMenu = document.querySelector('#settingsMenu');
    this.settingsMenu.classList.remove('menu-hidden');
  }

  dispose(){
    this.settingsMenu.classList.add('menu-hidden');
  }
}
