var Paper = require('paper');
var view = require('./view');

export default class Menu{
  constructor(onDone, params){
    view.reset();
    this.onDone = onDone;
    this.savedMaps = [];
    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      if(key.indexOf('map') === 0){
        this.savedMaps.push(JSON.parse(localStorage.getItem(key)));
      }
    }

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

    this.maps = document.querySelector('#maps');

    this.savedMaps.forEach(map => {
      var img = document.createElement('img');
      img.src = map.dataURL;
      img.addEventListener('click', () => this.onDone(
        {
          view: 'Game',
          params: {
            map: map.map,
            nrbOfPlayers: this.nbrOfPlayers
          }
        })
      );
      this.maps.appendChild(img);
    });
  }

  get nbrOfPlayers(){
    return this.nbrOfPlayers_;
  }

  set nbrOfPlayers(value){
    this.nbrOfPlayers_ = Math.max(1, Math.min(value, 4));
    this.nbrOfPlayersElement.innerText = this.nbrOfPlayers_;
  }

  dispose(){
    this.menu.style.display = '';
    while (this.maps.firstChild) {
      this.maps.removeChild(this.maps.firstChild);
    }
  }
}
