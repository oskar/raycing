require('./settingsMenu.css');
var view = require('../view');
var storage = require('../../storage');
var audio = require('../../audio');
var ClickListenerHandler = require('../clickListenerHandler');

export default class SettingsMenu{
  constructor(onDone, params){
    this.clickListenerHandler = new ClickListenerHandler();
    this.settingsMenu = document.querySelector('#settingsMenu');
    this.muteButton = document.querySelector('#muteButton');
    this.starsButton = document.querySelector('#starsButton');
    this.settingsMenu.classList.remove('menu-hidden');
    this.show();
  }

  show(){
    this.settingsMenu.classList.remove('menu-hidden');

    if(storage.GetIsMuted()) {
      this.muteButton.classList.add('selected');
    }
    this.clickListenerHandler.add(this.muteButton, () => this.toggleIsMuted());

    if(storage.GetEnableStars()) {
      this.starsButton.classList.add('selected');
    }
    this.clickListenerHandler.add(this.starsButton, () => this.toggleStarsVisibility());
  }

  dispose(){
    this.settingsMenu.classList.add('menu-hidden');
    this.clickListenerHandler.dispose();
  }

  toggleIsMuted(){
    var isMuted = audio.ToggleIsMuted();
    if(isMuted) {
      this.muteButton.classList.add('selected');
    } else {
      this.muteButton.classList.remove('selected');
    }
  }

  toggleStarsVisibility() {
    var newStarsVisibility = view.toggleStarsVisibility();
    if(newStarsVisibility) {
      this.starsButton.classList.add('selected');
    } else {
      this.starsButton.classList.remove('selected');
    }
  }
}
