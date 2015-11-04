var Paper = require('paper');
var Player = require('./player');
var Game = require('../game');
var view = require('./view');
var animation = require('./animation');

export default class GameGui{
  constructor(callback, params){
    this.callback = callback;
    this.game;
    this.nbrOfPlayers = params.nrbOfPlayers;
    this.players = [];
    this.colors = ['#ffff00', '#0000ff', '#ff0000', '#00ff00'];
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

    this.setViewToTrack();

    this.mousewheelListener = document.addEventListener('mousewheel', event => {
      if(event.wheelDelta === 0) return;
      this.mousewheel(event.wheelDelta < 0);
    });

    this.gestureendListener = document.addEventListener('gestureend', e => this.mousewheel(e.scale < 1), false);
  }

  get currentPlayer(){
    return this.players[this.game.currentPlayerIndex];
  }

  addPlayerClickEvent(event){
    var x = Math.round(event.point.x / 20) * 20;
    var y = Math.round(event.point.y / 20) * 20;
    var point = new Paper.Point(x, y);
    if(this.game.start.contains(point)){
      this.game.addPlayer(point, new Paper.Point(0, 0));
      this.players.push(new Player(this.colors.pop(), point));
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
      this.setViewToControls();
    }
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      return this.endGame(player);
    }
    guiPlayer.addPosition(player.position);
    this.nextTurn();
  }

  nextTurn(){
    this.game.nextTurn();
    this.clearControls();
    if(!this.game.currentPlayer.isAlive){
      return this.nextTurn();
    }
    if(this.game.gameOver) {
      return this.endGame();
    }
    this.drawControls();
  }

  drawControls(){
    var circles = this.game.vectorsForControls.map(v => this.createControl(v));
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

  setViewToControls(){
    if(!this.game.currentPlayer) return;
    var playerBounds = this.controls.bounds.include(this.game.currentPlayer.position);
    view.setView(playerBounds.expand(100));
  }

  setViewToTrack(){
    view.setView(this.game.track.bounds);
  }

  createControl(controlObject){
    var circle = this.currentPlayer.createPositionElement(controlObject.absolute);
    circle.movePlayerData = controlObject.relative;
    return circle;
  }

  endGame(player){
    this.callback({ view: 'Menu', params: player });
  }

  dispose(){
    this.course.remove();
    this.foreGround.remove();
    document.removeEventListener('gestureend', this.gestureendListener);
    document.removeEventListener('mosewheel', this.mousewheelListener);
    setTimeout(() => this.mouseControls.remove());
  }
}
