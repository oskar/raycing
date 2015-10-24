var Paper = require('paper');
var view = require('./view');

export default class Menu{
  constructor(onDone, params){
    view.reset();
    this.onDone = onDone;
    this.savedMaps = [];
    for (var i = 0; i < localStorage.length; i++){
      var key = localStorage.key(i);
      if(key.startsWith('map')){
        this.savedMaps.push(JSON.parse(localStorage.getItem(key)));
      }
    }

    this.menu = document.querySelector('#menu');
    this.menu.style.display = 'initial';

    var createMapButton = document.querySelector('#createMapButton');
    createMapButton.addEventListener('click', () => this.onDone({ view: 'Create map' }));

    this.maps = document.querySelector('#maps');

    this.savedMaps.forEach(map => {
      var mapDiv = document.createElement('div');
      mapDiv.className = "mapDiv";
      var img = document.createElement('img');
      img.src = map.dataURL;
      img.addEventListener('click', () => this.onDone({ view: 'Game', params: map.map }));
      mapDiv.appendChild(img);
      this.maps.appendChild(mapDiv);
    });
  }

  dispose(){
    this.menu.style.display = '';
    while (this.maps.firstChild) {
      this.maps.removeChild(this.maps.firstChild);
    }
  }
}
