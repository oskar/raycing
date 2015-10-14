var Game = require('./game');
var css = require('./gui.css');
var Victor = require('victor');

export default class Gui{
  constructor(){
    this.html = document.querySelector('html');

    this.body = document.querySelector('body');
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

    this.scale = 20;
    this.controls = [];
    this.viewportSize = new Victor(this.body.clientWidth, this.body.clientHeight)
    this.viewportCenter = new Victor(100,100);

    document.addEventListener('mousewheel', event => this.zoom(event.wheelDelta));
    document.addEventListener('keydown', event => this.keydown(event.keyCode));

    this.overlay = document.createElement('div');
    this.overlay.id = 'overlay';
    this.body.appendChild(this.overlay);

    this.menu = document.createElement('div');
    this.menu.id = 'menu';
    this.menuText = document.createElement('div');
    this.menuText.id = 'menuText';
    this.menu.appendChild(this.menuText);
    this.button = document.createElement('div');
    this.button.id = 'button';
    var text = document.createTextNode("New game");
    this.button.appendChild(text);
    this.button.addEventListener("click", () => this.newGame());
    this.menu.appendChild(this.button);
    this.body.appendChild(this.menu);

    this.background = document.createElement('span');
    this.background.id = 'background';
    this.body.appendChild(this.background);

    this.singleGameEntities = document.createElement('div');
    this.singleGameEntities.id = 'singleGameEntities';
    this.body.appendChild(this.singleGameEntities);
  }

  keydown(keyCode){
    var delta = 0;
    switch(keyCode){
      case(37):
      case(65):
        // l
        if(this.currentSelectedMoveIndex % 3 !== 0) {
          delta = -1;
        }
      break;
      case(38):
      case(87):
        // u
        if(this.currentSelectedMoveIndex < 6) {
          delta = 3;
        }
        break;
      case(39):
      case(68):
        // r
        if(this.currentSelectedMoveIndex % 3 !== 2) {
          delta = 1;
        }
        break;
      case(40):
      case(83):
        // d
        if(this.currentSelectedMoveIndex > 2) {
          delta = -3;
        }
        break;
      case(13):
          this.movePlayer(this.game.vectorsForControls[this.currentSelectedMoveIndex]);
        break;
    }
    this.setCurrentSelectedMoveIndex(this.currentSelectedMoveIndex + delta);
  }

  setCurrentSelectedMoveIndex(currentSelectedMoveIndex){
    this.currentSelectedMoveIndex = currentSelectedMoveIndex;
    this.controls.forEach((control, i) => {
      control.style.opacity = this.currentSelectedMoveIndex === i ? '1' : '0.5';
    })
  }

  newGame() {
    this.emptyElement(this.singleGameEntities);
    this.menu.style.display = 'none';
    this.overlay.style.display = 'none';
    this.controlsContainer = document.createElement('span');
    this.controlsContainer.id = 'controls';
    this.singleGameEntities.appendChild(this.controlsContainer);

    this.game = new Game();
    var startZone = this.createStartZone(this.game.start);
    this.singleGameEntities.appendChild(startZone);
    var endZone = this.createEndZone(this.game.end);
    this.singleGameEntities.appendChild(endZone);

    var colors = ['red', 'blue'];
    this.playerContainers = this.game.players.map(player => this.createPlayerContainerElement(player, colors.pop()));
    this.playerContainers.forEach(container => this.singleGameEntities.appendChild(container));

    this.singleGameEntities.appendChild(this.controlsContainer);

    this.updateView();
    this.nextTurn();
  }

  endGame(){
    this.menu.style.display = 'initial';
    this.overlay.style.display = 'initial';
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
    if(pos.x > 0){
      pos.x = 0;
      this.viewportCenter.x = this.viewportSize.x / (2 * this.scale);
    }
    if(pos.y > 0){
      pos.y = 0;
      this.viewportCenter.y = this.viewportSize.y / (2 * this.scale);
    }
    this.body.style.top = pos.y + "px";
    this.body.style.left = pos.x + "px";
    this.html.style.fontSize = this.scale + "px";
  }

  drawControls(vectors){
    this.emptyElement(this.controlsContainer);

    this.controls = vectors.map(v => this.createControl(v));
    this.setCurrentSelectedMoveIndex(Math.floor(vectors.length / 2));
    this.controls.forEach(control => this.controlsContainer.appendChild(control));
  }

  movePlayer(vectorObject){
    var playerContainer = this.playerContainers[this.game.currentPlayerIndex];
    var moveElement = this.createMoveElement(this.game.currentPlayer.position, vectorObject.relative);
    var player = this.game.movePlayer(vectorObject.relative);
    if(player.isInEndZone){
      this.endGame();
    }
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

  createPlayerContainerElement(player, color){
    var playerContainer = document.createElement('span');
    playerContainer.style.backgroundColor = color;
    this.body.appendChild(playerContainer);
    var positionElement = this.createPositionElement(player.position);
    playerContainer.appendChild(positionElement);
    return playerContainer;
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

  emptyElement(element){
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
