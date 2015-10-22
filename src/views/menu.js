var Paper = require('paper');

export default class Menu{
  constructor(onDone, params){
    console.log(params);
    this.onDone = onDone;
    this.savedMaps = [
      {
        name: "Test 1"
      },
      {
        name: "Test 2"
      }
    ];

    this.menu = document.querySelector('#menu');
    this.menu.style.display = 'initial';

    var createMapButton = document.querySelector('#createMapButton');
    createMapButton.addEventListener('click', () => this.onDone({ view: 'Create map' }));

    this.maps = document.querySelector('#maps');

    this.savedMaps.forEach((m, i) => {
      var mapDiv = document.createElement('div');
      mapDiv.className = "mapDiv";
      var textNode = document.createTextNode(m.name);
      mapDiv.appendChild(textNode);
      this.maps.appendChild(mapDiv);
      mapDiv.addEventListener('click', () => this.onDone({ view: 'Game', params: m }));
    });
  }

  dispose(){
    this.menu.style.display = '';
    while (this.maps.firstChild) {
      this.maps.removeChild(this.maps.firstChild);
    }
  }
}
