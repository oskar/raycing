var Game = require('./game');
var Victor = require('victor');

export default class Gui{
  constructor(){
    this.html = document.querySelector('html');
    this.body = document.querySelector('body');

    this.scale = 20;
    this.viewportSize = new Victor(this.body.clientWidth, this.body.clientHeight)
    this.viewportCenter = new Victor(100,100);
    this.playerContainers = [];

    this.controlsContainer = document.createElement('span')
    this.controlsContainer.id = 'controls';
    this.body.appendChild(this.controlsContainer);

    this.body.draggable = true;
    var emptyDraggableIcon = document.createElement('img');
    emptyDraggableIcon.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    this.body.ondragstart = event => {
      this.lastDragPosition = new Victor(event.clientX, event.clientY);
      event.dataTransfer.setDragImage(emptyDraggableIcon, 0, 0)
    };
    this.body.addEventListener("drag", event => {
      var newDragPosition = new Victor(event.clientX, event.clientY);
        // Wierd behaviour that sends 0,0 on drag end
      if(newDragPosition.x === 0) return;
      var vector = this.lastDragPosition.subtract(newDragPosition);
      this.lastDragPosition = newDragPosition;
      this.pan(vector);
    });

    document.addEventListener("mousewheel", event => this.zoom(event.wheelDelta));

    this.game = new Game();
    var startZone = this.createStartZone(this.game.start);
    this.body.appendChild(startZone);
    var endZone = this.createEndZone(this.game.end);
    this.body.appendChild(endZone);

    var colors = ['red', 'blue'];
    this.game.players.map(player => this.addPlayer(player, colors.pop()));

    this.updateView();
    this.nextTurn();
  }

  get panScaleVector(){
    return new Victor(this.scale, this.scale);
  }

  pan(vector){
    var scaledVector = vector.divide(this.panScaleVector);
    this.viewportCenter.add(scaledVector);
    this.updateView();
  }

  zoom(delta){
    if(delta > 20) delta = 20;
    if(delta < -20) delta = -20;
    var value = this.scale + delta/7;
    if(value < 5) value = 5;
    if(value > 100) value = 100;
    this.scale = value;
    this.updateView();
  }

  updateView(){
    var scaledViewPort = this.viewportCenter.clone().multiply(this.panScaleVector);
    var pos = this.viewportSize.clone().divide(new Victor(2,2)).subtract(scaledViewPort);
    this.body.style.top = pos.y + "px";
    this.body.style.left = pos.x + "px";
    this.html.style.fontSize = this.scale + "px";
  }

  addPlayer(player, color){
    var playerContainer = document.createElement('span');
    playerContainer.style.backgroundColor = color;
    this.body.appendChild(playerContainer);
    this.playerContainers.push(playerContainer);
    var positionElement = this.createPositionElement(player.position);
    playerContainer.appendChild(positionElement);
  }

  drawControls(vectors){
    while(this.controlsContainer.firstChild) {
      this.controlsContainer.removeChild(this.controlsContainer.firstChild);
    }

    vectors
      .map(v => this.createControl(v))
      .forEach(control => this.controlsContainer.appendChild(control));
  }

  movePlayer(vectorObject){
    var playerContainer = this.playerContainers[this.game.currentPlayerIndex];
    var moveElement = this.createMoveElement(this.game.currentPlayer.position, vectorObject.relative);
    var player = this.game.movePlayer(vectorObject.relative);
    console.log(player.isInEndZone);
    var positionElement = this.createPositionElement(player.position);

    playerContainer.appendChild(moveElement);
    playerContainer.appendChild(positionElement);

    this.nextTurn();
  }

  controlHovered(control, vectorObject){
    control.style.opacity = 1;
  }

  controlStopHovered(control, vectorObject){
    control.style.opacity = "";
  }

  nextTurn(){
    this.drawControls(this.game.vectorsForControls);
  }

  getPixelPosition(ordinate){
    return (ordinate) + "rem";
  }

  createPositionElement(position){
    var positionElement = document.createElement('span');
    positionElement.className = 'position';
    positionElement.style.top = this.getPixelPosition(position.y);
    positionElement.style.left = this.getPixelPosition(position.x);
    return positionElement;
  }

  createMoveElement(position, move){
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
    return moveElement;
  }

  createControl(vectorObject){
    var control = document.createElement('span');
    control.style.top = this.getPixelPosition(vectorObject.absolute.y);
    control.style.left = this.getPixelPosition(vectorObject.absolute.x);
    control.addEventListener("click", () => this.movePlayer(vectorObject));
    control.addEventListener("mouseover", () => this.controlHovered(control, vectorObject));
    control.addEventListener("mouseout", () => this.controlStopHovered(control, vectorObject));
    return control;
  }

  createStartZone(start){
    var control = this.createZone(start.topLeft, start.bottomRight);
    control.id = 'start';
    return control;
  }

  createEndZone(end) {
    var control = this.createZone(end.topLeft, end.bottomRight);
    control.id = 'end';
    return control;
  }

  createZone(topLeft, bottomRight) {
    var diagonal = bottomRight.clone().subtract(topLeft);
    var control = document.createElement('span');
    control.style.top = this.getPixelPosition(topLeft.y);
    control.style.left = this.getPixelPosition(topLeft.x);
    control.style.height = this.getPixelPosition(diagonal.y);
    control.style.width = this.getPixelPosition(diagonal.x);
    control.className = 'zone';
    return control;
  }
}
