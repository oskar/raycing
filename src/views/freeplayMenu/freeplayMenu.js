require('./freeplayMenu.css');
var view = require('../view');
var audio = require('../../audio');
var storage = require('../../storage');
var prepop = require('../../prepop/mapPrepopulator');
var ClickListenerHandler = require('../clickListenerHandler');

export default class Menu{
  constructor(onDone, params){
    this.clickListenerHandler = new ClickListenerHandler();
    this.selectedMapImage = document.querySelector('#selectedMapImage');
    this.maps = document.querySelector('#maps');

    view.reset();
    this.onDone = onDone;

    var maps = storage.GetMaps();
    if(!maps.length) {
      prepop.prepopulateMaps(maps => this.setMaps(maps));
    } else {
      this.setMaps(maps);
    }

    this.nbrOfPlayersElement = document.querySelector('#nbrOfPlayers');
    this.nbrOfPlayersElement.innerText = this.nbrOfPlayers;

    this.muteButton = document.querySelector('#muteButton');
    if(storage.GetIsMuted()) {
      this.muteButton.classList.add('selected');
    }
    this.clickListenerHandler.add(this.muteButton, () => this.toggleIsMuted());

    this.freeplayMenu = document.querySelector('#freeplayMenu');
    this.freeplayMenu.style.visibility = 'initial';

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
    return storage.GetNbrOfPlayers();
  }

  set nbrOfPlayers(value){
    var nbrOfPlayers = Math.max(1, Math.min(value, 4));
    storage.SetNbrOfPlayers(nbrOfPlayers);
    this.nbrOfPlayersElement.innerText = nbrOfPlayers;
  }

  get selectedMap() {
    return this.selectedMap_;
  }

  set selectedMap(value) {
    this.selectedMap_ = value;
    this.selectedMapImage.setAttribute('src', this.selectedMap_.dataURL);
  }

  toggleIsMuted(){
    var isMuted = audio.ToggleIsMuted();
    if(isMuted) {
      this.muteButton.classList.add('selected');
    } else {
      this.muteButton.classList.remove('selected');
    }
  }

  removeCurrentMap(){
    if(this.selectedMap) storage.RemoveMap(this.selectedMap);

    this.savedMaps = storage.GetMaps();
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
    this.freeplayMenu.style.visibility = '';
    this.clearMapsList();
    this.clickListenerHandler.dispose();
  }
}
