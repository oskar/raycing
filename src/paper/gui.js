var Paper = require('paper');
var Victor = require('victor');
var css = require('./app.css');
var Player = require('./player');
var Game = require('../game');
var victorToPoint = require('./utils').victorToPoint;

export default class Gui{
  constructor(canvas){
    this.scale = 20;
    this.game;
    this.players;
    this.controls = [];

    var body = document.body;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', 1000);
    canvas.setAttribute('height', 1000);
    body.appendChild(canvas);

    Paper.setup(canvas);

    var tool = new Paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);

    this.newGame();
  }

  get scaleVector(){
    return new Victor(this.scale, this.scale);
  }

  onMouseDown(event){
    var itemClicked = event.getItem();
    if(itemClicked && itemClicked.movePlayerData){
      this.movePlayer(itemClicked.movePlayerData);
    }
  }

  newGame(){
    this.game = new Game();

    var colors = ['#ff0000', '#0000ff'];
    this.players = this.game.players.map(player => new Player(colors.pop(), victorToPoint(player.position.clone().multiply(this.scaleVector))));
    this.nextTurn();
  }

  nextTurn(){
    this.drawControls(this.game.vectorsForControls);
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame();
    }
    guiPlayer.addPosition(player.position.clone().multiply(this.scaleVector));
    this.nextTurn();
  }

  drawControls(vectors){
    this.controls.forEach(c => c.remove());
    this.controls = vectors.map(v => this.createControl(v));
    this.render();
  }

  createControl(victor){
    var circle = new Paper.Path.Circle({
      center: victorToPoint(victor.absolute.clone().multiply(this.scaleVector)),
      fillColor: '#00ff00',
      strokeColor: 'black',
      strokeWidth: 2,
      opacity: 0.5,
      radius: this.scale/2,
      movePlayerData: victor.relative
    });
    return circle;
  }

  render(){
    Paper.view.draw();
  }
}
