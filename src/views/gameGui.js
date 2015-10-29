var Paper = require('paper');
var Player = require('./player');
var Game = require('../game');
var view = require('./view');

export default class GameGui{
  constructor(callback, params){
    this.callback = callback;
    this.game;
    this.nbrOfPlayers = 2;
    this.players = [];
    this.colors = ['#ff0000', '#0000ff'];
    this.controls = new Paper.Group();
    this.foreGround = new Paper.Group([this.controls]);
    this.course = new Paper.Group();
    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDown = e => this.addPlayerClickEvent(e);

    this.game = new Game(params);

    var track = this.game.track;
    track.closed = true;
    track.fillColor = 'purple';

    var startArea = this.game.start;
    startArea.fillColor = 'teal';

    var endArea = this.game.end;
    endArea.fillColor = 'yellow';

    // this.border = track.clone();
    // this.border.fillColor.alpha = 0;
    // this.border.strokeColor = 'white';
    // this.border.strokeWidth = 0.5;

    this.course.addChild(track);
    this.course.addChild(startArea);
    this.course.addChild(endArea);
    view.addCourse(this.course);

    this.setViewToTrack();

    document.addEventListener('mousewheel', event => this.mousewheel(event.wheelDelta));

    document.addEventListener('gestureend', e => this.mousewheel(e.scale), false);
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

  mousewheel(delta){
    if(delta < 0) {
      this.setViewToTrack();
    } else if(delta > 0) {
      this.setViewToControls();
    }
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame(player);
    }
    guiPlayer.addPosition(player.position);
    this.nextTurn();
  }

  nextTurn(){
    this.game.nextTurn();
    this.controls.removeChildren();
    if(!this.game.currentPlayer.isAlive){
      this.nextTurn();
    }
    this.drawControls();
  }

  drawControls(){
    this.game.vectorsForControls
      .map(v => this.createControl(v))
      .forEach(control => this.controls.addChild(control));
    this.setViewToControls();
  }

  setViewToControls(){
    var playerBounds = this.controls.bounds.include(this.game.currentPlayer.position);
    view.setView(playerBounds.expand(50));
  }

  setViewToTrack(){
    view.setView(this.game.track.bounds.expand(50));
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
    setTimeout(() => this.mouseControls.remove());
  }
}
