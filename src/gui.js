var Game = require('./game');
var Victor = require('victor');

export default class Gui{
  constructor(){
    this.scale = 20;
    this.panValue = new Victor(0, 0); // Pan in pixels
    this.body = document.querySelector('body');

    this.body.draggable = true;
    var img = document.createElement('img');
    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    this.body.ondragstart = event => {
      this.lastDragPosition = new Victor(event.clientX, event.clientY);
      event.dataTransfer.setDragImage(img, 0, 0)
    };
    this.body.addEventListener("drag", event => this.pan(new Victor(event.clientX, event.clientY)));

    this.html = document.querySelector('html');
    this.controlsContainer = document.createElement('span')
    this.controlsContainer.id = 'controls';
    this.body.appendChild(this.controlsContainer);

    document.addEventListener("mousewheel", event => this.modifyScale(event.wheelDelta));
    this.controls = document.querySelector('#controls');
    this.playerContainers = [];

    this.colors = ['red', 'blue'];

    this.game = new Game();
    this.game.players.map(player => this.addPlayer(player));
    this.nextTurn();
  }

  pan(newDragPosition){
    // Wierd behaviour that sends 0,0 on drag end
    if(newDragPosition.x === 0) return;
    var vector = this.lastDragPosition.subtract(newDragPosition);
    this.lastDragPosition = newDragPosition;
    this.panValue.x += vector.x;
    this.panValue.y += vector.y;
    this.body.style.top = this.panValue.y + "px";
    this.body.style.left = this.panValue.x + "px";
  }

  modifyScale(delta){
    if(delta > 20) delta = 20;
    if(delta < -20) delta = -20;
    var value = this.scale + delta/7;
    if(value < 5) value = 5;
    if(value > 100) value = 100;
    this.scale = value;
    this.html.style.fontSize = Math.round(value) + "px";
  }

  addPlayer(player){
    var container = document.createElement('span');
    container.style.backgroundColor = this.colors.pop();
    this.body.appendChild(container);
    this.playerContainers.push(container);
    this.appendPosition(container, player.position)
  }

  appendPosition(playerContainer, position){
    var newPositionElement = document.createElement('span');
    newPositionElement.className = 'position';
    newPositionElement.style.top = this.getPixelPosition(position.y);
    newPositionElement.style.left = this.getPixelPosition(position.x);
    playerContainer.appendChild(newPositionElement);
  }

  appendMove(playerContainer, position, move){
    var top = Math.min(position.y, position.y + move.y);
    var left = Math.min(position.x, position.x + move.x);
    var height = Math.abs(move.y);
    var width = Math.abs(move.x);

    var hasTopToTheLeft = (move.x > 0 && move.y > 0) || (move.x < 0 && move.y < 0);
    var orientationClass = hasTopToTheLeft ? 'top-left' : 'top-right';

    var moveElement = document.createElement('span');
    moveElement.className = 'move ' + orientationClass;
    moveElement.style.top = this.getPixelPosition(top);
    moveElement.style.left = this.getPixelPosition(left);
    moveElement.style.width = this.getPixelPosition(width);
    moveElement.style.height = this.getPixelPosition(height);
    playerContainer.appendChild(moveElement);
  }

  getPixelPosition(ordinate){
    return ordinate + "rem";
  }

  drawControls(vectors){
    while(this.controlsContainer.firstChild) {
      this.controlsContainer.removeChild(this.controlsContainer.firstChild);
    }

    vectors.forEach(v => this.createControl(v));
  }

  createControl(vectorObject){
    var target = document.createElement('span');
    target.attributes.x = vectorObject.relative.x;
    target.attributes.y = vectorObject.relative.y;
    target.style.top = this.getPixelPosition(vectorObject.absolute.y);
    target.style.left = this.getPixelPosition(vectorObject.absolute.x);
    target.addEventListener("click", (e) => {
      var attributes = e.target.attributes;
      var playerContainer = this.playerContainers[this.game.currentPlayerIndex];
      var position = this.game.movePlayer(vectorObject.relative);
      this.appendPosition(playerContainer, position);

      this.nextTurn();
    });
    this.controlsContainer.appendChild(target);
  }

  nextTurn(){
    this.drawControls(this.game.vectorsForControls);
  }
}
