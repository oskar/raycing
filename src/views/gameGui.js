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
    this.course = new Paper.Group();
    this.controls = new Paper.Group();
    this.foreGround = new Paper.Group([this.controls]);
    this.elements = new Paper.Group([
      this.course,
      this.foreGround,
      this.controls
    ]);
    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDown = e => this.addPlayerClickEvent(e);

    this.game = new Game(params);

    var track = this.game.track;
    track.closed = true;
    track.fillColor = 'grey';
    track.strokeColor = 'black';
    track.opacity = '0.7';
    this.course.addChild(track);

    var startArea = this.game.start;
    startArea.fillColor = 'green';
    startArea.strokeColor = 'black';
    startArea.opacity = '0.7';
    this.course.addChild(startArea);

    var endArea = this.game.end;
    endArea.fillColor = 'yellow';
    endArea.strokeColor = 'black';
    endArea.opacity = '0.7';
    this.course.addChild(endArea);
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
    this.players.forEach(p => this.foreGround.appendBottom(p.groups));
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
  }

  createControl(controlObject){
    var circle = this.currentPlayer.createPositionElement(controlObject.absolute);
    circle.opacity = 0.5;
    circle.movePlayerData = controlObject.relative;
    return circle;
  }

  endGame(player){
    this.callback({ view: 'Menu', params: player });
  }

  dispose(){
    this.elements.remove();
    setTimeout(() => this.mouseControls.remove());
  }
}
