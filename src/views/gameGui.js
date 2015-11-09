var Paper = require('paper');
var Player = require('./player');
var Game = require('../game');
var view = require('./view');
var animation = require('./animation');
var audio = require('../audio');

export default class GameGui{
  constructor(callback, params){
    this.callback = callback;
    this.game;
    this.nbrOfPlayers = params.nrbOfPlayers;
    this.players = [];
    this.playerConfigs = [
      { name: 'Yellow', color: '#ffff00' },
      { name: 'Blue', color: '#0000ff' },
      { name: 'Red', color: '#ff0000' },
      { name: 'Green', color: '#00ff00' },
    ]
    this.controls = new Paper.Group();
    this.controlAnimations = [];
    this.foreGround = new Paper.Group([this.controls]);
    this.course = new Paper.Group();
    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDown = e => this.addPlayerClickEvent(e);

    this.game = new Game(params.map);

    var track = this.game.track;
    track.fillColor = 'purple';
    var startArea = this.game.start;
    startArea.fillColor = 'teal';
    var endArea = this.game.end;
    endArea.fillColor = 'yellow';

    this.course.addChild(track);
    this.course.addChild(startArea);
    this.course.addChild(endArea);
    view.addCourse(this.course);

    this.setViewToStart();

    this.mousewheelListener = document.addEventListener('mousewheel', event => {
      if(event.wheelDelta === 0) return;
      this.mousewheel(event.wheelDelta < 0);
    });

    this.gestureendListener = document.addEventListener('gestureend', e => this.mousewheel(e.scale < 1), false);

    this.endGameScreen = document.querySelector('#endGameScreen');
    this.endGameButton = document.querySelector('#endGameButton');
    this.endGameText = document.querySelector('#endGameText');
    this.clickListeners = [];
    this.addClickListener(endGameButton, () => this.endGameButtonListener());
  }

  get currentPlayer(){
    return this.players[this.game.currentPlayerIndex];
  }

  addPlayerClickEvent(event){
    audio.playClick();
    var x = Math.round(event.point.x / 20) * 20;
    var y = Math.round(event.point.y / 20) * 20;
    var point = new Paper.Point(x, y);
    if(this.game.start.contains(point)){
      this.game.addPlayer(point, new Paper.Point(0, 0));
      this.players.push(new Player(this.playerConfigs.pop(), point));
      if(this.players.length === this.nbrOfPlayers){
        this.startGame();
      }
    }
  }

  startGame(){
    this.players.forEach(p => this.foreGround.appendBottom(p.elements));
    this.mouseControls.onMouseDown = e => this.onMouseDown(e);
    this.game.startGame();
    this.drawControls();
  }

  onMouseDown(event){
    audio.playClick();
    var item = event.getItem();
    if(!item){
      return;
    }
    var itemClicked = item.hitTest(event.point).item;
    if(itemClicked && itemClicked.movePlayerData){
      this.movePlayer(itemClicked.movePlayerData);
    }
  }

  mousewheel(shouldZoomOut){
    if(shouldZoomOut) {
      this.setViewToTrack();
    } else {
      if(!this.game.currentPlayer) {
        this.setViewToStart();
      } else {
        this.setViewToControls();
      }
    }
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame('Game over, ' + guiPlayer.name.toLowerCase() + ' player won!');
    } else {
      guiPlayer.addPosition(player.position);
      this.nextTurn();
    }
  }

  nextTurn(){
    this.game.nextTurn();
    this.clearControls();

    if(this.game.gameOver()) {
      this.endGame('Everybody crashed, you all lost!');
    } else if(!this.game.currentPlayer.isAlive){
      this.nextTurn();
    } else {
      this.drawControls();
    }
  }

  drawControls(){
    var circles = this.game.vectorsForControls.map(controlObject => this.createControl(controlObject));
    this.controlAnimations = circles.map(circle => animation.add(elapsedTime => {
      circle.scale(1 + (Math.sin(elapsedTime * 10) / 100));
    }));
    circles.forEach(circle => this.controls.addChild(circle));
    this.setViewToControls();
  }

  clearControls(){
    this.controls.removeChildren();
    this.controlAnimations.forEach(animation => animation.remove());
  }

  setViewToStart() {
    view.setView(this.game.start.bounds.expand(200));
  }

  setViewToControls(){
    var playerBounds = this.controls.bounds.include(this.game.currentPlayer.position);
    view.setView(playerBounds.expand(200));
  }

  setViewToTrack(){
    view.setView(this.game.track.bounds);
  }

  createControl(controlObject){
    var circle = this.currentPlayer.createPositionElement(controlObject.absolute, this.currentPlayer.radius);
    circle.movePlayerData = controlObject.relative;
    circle.opacity = 0.5;
    return circle;
  }

  endGame(text){
    this.clearControls();
    this.endGameScreen.style.visibility = 'visible';
    this.endGameText.textContent = text;
  }

  endGameButtonListener() {
    this.callback({ view: 'Menu' });
  }

  addClickListener(element, onclick) {
    var callback = event => {
      audio.playClick();
      onclick(event);
    }
    element.addEventListener('click', callback);
    this.clickListeners.push({element, callback});
  }

  dispose(){
    this.course.remove();
    this.foreGround.remove();
    document.removeEventListener('gestureend', this.gestureendListener);
    document.removeEventListener('mosewheel', this.mousewheelListener);
    this.clickListeners.forEach(listener => listener.element.removeEventListener('click', listener.callback));
    this.endGameScreen.style.visibility = '';
    this.endGameText.textContent = '';
    this.mouseControls.remove();
  }
}
