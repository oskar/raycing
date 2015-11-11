require('./menu.css');
var view = require('../view');
var audio = require('../../audio');
var prepop = require('../../prepop/mapPrepopulator');
var ClickListenerHandler = require('../clickListenerHandler');

export default class Menu{
  constructor(onDone, params){
    this.clickListenerHandler = new ClickListenerHandler();
    this.selectedMapImage = document.querySelector('#selectedMapImage');
    this.maps = document.querySelector('#maps');

    view.reset();
    this.onDone = onDone;

    var maps = this.getMapsFromLocalStorage();
    if(!maps.length) {
      prepop.prepopulateMaps(maps => this.setMaps(maps));
    } else {
      this.setMaps(maps);
    }

    this.nbrOfPlayersElement = document.querySelector('#nbrOfPlayers');
    this.nbrOfPlayers = 2;

    this.menu = document.querySelector('#menu');
    this.menu.style.visibility = 'initial';

    var createMapButton = document.querySelector('#createMapButton');
    this.clickListenerHandler.add(createMapButton, () => this.onDone({ view: 'Create map' }));

    var fewerPlayersButton = document.querySelector('#fewerPlayersButton');
    this.clickListenerHandler.add(fewerPlayersButton, () => this.nbrOfPlayers--);

    var morePlayersButton = document.querySelector('#morePlayersButton');
    this.clickListenerHandler.add(morePlayersButton, () => this.nbrOfPlayers++);

    var editMapButton = document.querySelector('#editMapButton');
    this.clickListenerHandler.add(editMapButton, () => this.onDone({ view: 'Create map', params: this.selectedMap }));

    var deleteMapButton = document.querySelector('#deleteMapButton');
    this.clickListenerHandler.add(deleteMapButton, () => this.removeCurrentMap());

    this.clickListenerHandler.add(selectedMapImage, () => {
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
      this.clickListenerHandler.add(img, () => this.selectedMap = map);
      this.maps.appendChild(img);
    });
  }

  clearMapsList(){
    while (this.maps.children.length > 1) {
      this.maps.removeChild(this.maps.lastChild);
    }
  }

  dispose(){
    this.menu.style.visibility = '';
    this.clearMapsList();
    this.clickListenerHandler.dispose();
  }
}
