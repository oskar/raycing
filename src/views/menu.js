var Paper = require('paper');
var view = require('./view');

export default class Menu{
  constructor(onDone, params){
    this.selectedMapImage = document.querySelector('#selectedMapImage');
    this.maps = document.querySelector('#maps');

    view.reset();
    this.onDone = onDone;

    this.savedMaps = this.getMapsFromLocalStorage();
    if(this.savedMaps.length) this.selectedMap = this.savedMaps[0];
    this.renderMapsList();

    this.nbrOfPlayers_ = 2;
    this.nbrOfPlayersElement = document.querySelector('#nbrOfPlayers');

    this.menu = document.querySelector('#menu');
    this.menu.style.display = 'initial';

    var createMapButton = document.querySelector('#createMapButton');
    createMapButton.addEventListener('click', () => this.onDone({ view: 'Create map' }));

    var fewerPlayersButton = document.querySelector('#fewerPlayersButton');
    fewerPlayersButton.addEventListener('click', () => this.nbrOfPlayers--);

    var morePlayersButton = document.querySelector('#morePlayersButton');
    morePlayersButton.addEventListener('click', () => this.nbrOfPlayers++);

    var editMapButton = document.querySelector('#editMapButton');
    editMapButton.addEventListener('click', () => this.onDone({ view: 'Create map', params: this.selectedMap }));

    var deleteMapButton = document.querySelector('#deleteMapButton');
    deleteMapButton.addEventListener('click', () => this.removeCurrentMap());

    selectedMapImage.addEventListener('click', () => {
      this.onDone({
        view: 'Game',
        params: {
          map: this.selectedMap.map,
          nrbOfPlayers: this.nbrOfPlayers
        }
      })
    });
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
    localStorage.removeItem(this.selectedMap.key);
    this.savedMaps = this.getMapsFromLocalStorage();
    this.selectedMap = this.savedMaps[0];
    this.clearMapsList();
    this.renderMapsList();
  }

  renderMapsList(){
    this.savedMaps.forEach((map, index) => {
      if(index === 0) this.selectedMap = map;
      var img = document.createElement('img');
      img.src = map.dataURL;
      img.addEventListener('click', () => this.selectedMap = map);
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
  }
}
