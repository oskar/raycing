require('./gameGui.css');
var Paper = require('paper');
var Player = require('./player');
var Game = require('../../game/game');
var view = require('../view');
var animation = require('../animation');
var audio = require('../../audio');
var ClickListenerHandler = require('../clickListenerHandler');

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

    this.game = new Game(params.map, params.nrbOfPlayers);
    this.game.vectorsForControlsStream.onValue(controls => this.drawControls(controls));
    this.game.playerPositionStream.onValue(playerAndPosition => this.addPlayerPosition(playerAndPosition.playerIndex, playerAndPosition.position));
    this.game.gameEndedStream.onValue(endState => this.endGame(endState));

    var track = this.game.track;
    track.fillColor = 'purple';
    var startArea = this.game.start;
    startArea.fillColor = 'green';
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

    this.gameGui = document.querySelector('#gameGui');
    this.endGameButton = document.querySelector('#endGameButton');
    this.endGameText = document.querySelector('#endGameText');

    this.clickListenerHandler = new ClickListenerHandler();
    this.clickListenerHandler.add(endGameButton, () => this.endGameButtonListener());
  }

  get currentPlayer(){
    return this.players[this.game.currentPlayerIndex];
  }

  addPlayerClickEvent(event){
    audio.playClick();
    
    var scale = this.game.scale;
    var x = Math.round(event.point.x / scale) * scale;
    var y = Math.round(event.point.y / scale) * scale;
    var point = new Paper.Point(x, y);

    if(this.game.start.contains(point)){
      this.addPlayer(point);
      if(this.players.length === this.nbrOfPlayers){
        this.startGame();
      }
    }
  }

  getAllowedStartPositions() {
    var scale = this.game.scale;
    var bounds = this.game.start.bounds;

    var x_start = Math.ceil(bounds.left / scale) * scale;
    var x_end = Math.floor(bounds.right / scale) * scale;

    var y_start = Math.ceil(bounds.top / scale) * scale;
    var y_end = Math.floor(bounds.bottom / scale) * scale;

    var startingPoints = [];

    for (var x = x_start; x <= x_end; x += scale) {
      for (var y = y_start; y <= y_end; y += scale) {
        var point = new Paper.Point(x, y);
        if(this.game.start.contains(point)) {
          startingPoints.push(point);
        }
      }
    }

    return startingPoints;
  }

  addPlayer(point){
    this.game.addPlayer(point);
    this.players.push(new Player(this.playerConfigs.pop(), point));
  }

  startGame(){
    this.players.forEach(p => this.foreGround.appendBottom(p.elements));
    this.mouseControls.onMouseDown = e => this.onMouseDown(e);
    this.game.startGame();
  }

  onMouseDown(event){
    audio.playClick();
    var item = event.getItem();
    if(!item){
      return;
    }
    var itemClicked = item.hitTest(event.point).item;
    if(itemClicked && itemClicked.movePlayerData){
      this.game.movePlayer(itemClicked.movePlayerData);
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

  drawControls(controls){
    this.clearControls();
    var circles = controls.map(controlObject => this.createControl(controlObject));
    this.controlAnimations = circles.map(circle => animation.add(elapsedTime => {
      circle.scale(1 + (Math.sin(elapsedTime * 10) / 100));
    }));
    circles.forEach(circle => this.controls.addChild(circle));
    this.setViewToControls();
  }

  createControl(controlObject){
    var circle = this.currentPlayer.createPositionElement(controlObject.absolute, this.currentPlayer.radius);
    circle.movePlayerData = controlObject.relative;
    circle.opacity = 0.5;
    return circle;
  }

  clearControls(){
    this.controls.removeChildren();
    this.controlAnimations.forEach(animation => animation.remove());
  }

  addPlayerPosition(playerIndex, position){
    this.players[playerIndex].addPosition(position);
  }

  endGame(endState){
    this.clearControls();
    this.gameGui.classList.remove('menu-hidden');

    var text = '';

    if(endState.winningPlayerIndex < 0) {
      text = 'Everybody crashed, you all lost!';
    }
    else {
      var winner = 'Player ' + (endState.winningPlayerIndex + 1);
      text = 'Game over, ' + winner + ' won in ' + endState.moves + ' moves!';
    }

    this.endGameText.textContent = text;
  }

  endGameButtonListener() {
    this.callback({ view: 'Main menu' });
  }

  dispose(){
    this.course.remove();
    this.foreGround.remove();
    document.removeEventListener('gestureend', this.gestureendListener);
    document.removeEventListener('mosewheel', this.mousewheelListener);
    this.clickListenerHandler.dispose();
    this.gameGui.classList.add('menu-hidden');
    this.endGameText.textContent = '';
    this.mouseControls.remove();
  }
}
