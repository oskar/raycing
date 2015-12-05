require('./freeplayMenu.css');
var view = require('../view');
var storage = require('../../storage');
var prepop = require('../../prepop/mapPrepopulator');
var ClickListenerHandler = require('../clickListenerHandler');

export default class FreeplayMenu{
  constructor(onDone, params){
    this.clickListenerHandler = new ClickListenerHandler();
    this.onDone = onDone;
    this.selectedMapImage = document.querySelector('#selectedMapImage');
    this.nbrOfPlayersElement = document.querySelector('#nbrOfPlayers');
    this.freeplayMenu = document.querySelector('#freeplayMenu');
    this.maps = document.querySelector('#maps');

    this.show();
  }

  show(){
    this.freeplayMenu.classList.remove('menu-hidden');

    var maps = storage.GetMaps();
    if(!maps.length) {
      prepop.prepopulateMaps(maps => this.setMaps(maps));
    } else {
      this.setMaps(maps);
    }

    this.nbrOfPlayersElement.innerText = this.nbrOfPlayers;

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

  dispose(){
    this.freeplayMenu.classList.add('menu-hidden');
    this.clearMapsList();
    this.clickListenerHandler.dispose();
  }

  clearMapsList(){
    while (this.maps.children.length > 1) {
      this.maps.removeChild(this.maps.lastChild);
    }
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
}
