var Paper = require('paper');
var view = require('./view');
var audio = require('../audio');
var prepop = require('../prepop/mapPrepopulator');

export default class Menu{
  constructor(onDone, params){
    this.selectedMapImage = document.querySelector('#selectedMapImage');
    this.maps = document.querySelector('#maps');

    view.reset();
    this.onDone = onDone;

    this.clickListeners = [];

    var maps = this.getMapsFromLocalStorage();
    if(!maps.length) {
      prepop.prepopulateMaps(maps => this.setMaps(maps));
    } else {
      this.setMaps(maps);
    }

    this.nbrOfPlayers_ = 2;
    this.nbrOfPlayersElement = document.querySelector('#nbrOfPlayers');

    this.menu = document.querySelector('#menu');
    this.menu.style.display = 'initial';

    var createMapButton = document.querySelector('#createMapButton');
    this.addClickListener(createMapButton, () => this.onDone({ view: 'Create map' }));

    var fewerPlayersButton = document.querySelector('#fewerPlayersButton');
    this.addClickListener(fewerPlayersButton, () => this.nbrOfPlayers--);

    var morePlayersButton = document.querySelector('#morePlayersButton');
    this.addClickListener(morePlayersButton, () => this.nbrOfPlayers++);

    var editMapButton = document.querySelector('#editMapButton');
    this.addClickListener(editMapButton, () => this.onDone({ view: 'Create map', params: this.selectedMap }));

    var deleteMapButton = document.querySelector('#deleteMapButton');
    this.addClickListener(deleteMapButton, () => this.removeCurrentMap());

    this.addClickListener(selectedMapImage, () => {
      this.onDone({
        view: 'Game',
        params: {
          map: this.selectedMap.map,
          nrbOfPlayers: this.nbrOfPlayers
        }
      })
    });
  }

  setMaps(maps) {
    this.savedMaps = maps;
    this.selectedMap = this.savedMaps[0];
    this.renderMapsList();
  }

  addClickListener(element, onclick) {
    var callback = event => {
      audio.playClick();
      onclick(event);
    }
    element.addEventListener('click', callback);
    this.clickListeners.push({element, callback});
  }

  get nbrOfPlayers(){
    return this.nbrOfPlayers_;
  }

  set nbrOfPlayers(value){
    this.nbrOfPlayers_ = Math.max(1, Math.min(value, 4));
    this.nbrOfPlayersElement.innerText = this.nbrOfPlayers_;
  }

  get selectedMap() {
    return this.selectedMap_;
  }

  set selectedMap(value) {
    this.selectedMap_ = value;
    this.selectedMapImage.setAttribute('src', this.selectedMap_.dataURL);
  }

  getMapsFromLocalStorage(){
    var maps = [];
    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      if(key.indexOf('map') === 0){
        maps.push(JSON.parse(localStorage.getItem(key)));
      }
    }

    return maps;
  }

  removeCurrentMap(){
    if(this.selectedMap) localStorage.removeItem(this.selectedMap.key);
    this.savedMaps = this.getMapsFromLocalStorage();
    if(this.savedMaps.length > 0) this.selectedMap = this.savedMaps[0];
    this.clearMapsList();
    this.renderMapsList();
  }

  renderMapsList(){
    this.savedMaps.forEach((map, index) => {
      if(index === 0) this.selectedMap = map;
      var img = document.createElement('img');
      img.src = map.dataURL;
      this.addClickListener(img, () => this.selectedMap = map);
      this.maps.appendChild(img);
    });
  }

  clearMapsList(){
    while (this.maps.children.length > 1) {
      this.maps.removeChild(this.maps.lastChild);
    }
  }

  dispose(){
    this.menu.style.display = '';
    this.clearMapsList();
    this.clickListeners.forEach(listener => listener.element.removeEventListener('click', listener.callback));
  }
}
