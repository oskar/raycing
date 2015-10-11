var Paper = require('paper');
var Victor = require('victor');
var css = require('./app.css');
var Player = require('./player');
var Game = require('../game');
var victorToPoint = require('./utils').victorToPoint;
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

export default class Gui{
  constructor(canvas){
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.scale = 20;
    this.initPaper();
    this.game;
    this.players;
    this.players = [];
    this.backGround = new Paper.Group();
    this.controls = new Paper.Group();
    this.foreGround = new Paper.Group([this.controls]);

    var tool = new Paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);

    this.drawGrid(this.width, this.height);
    this.newGame();
  }

  get scaleVector(){
    return new Victor(this.scale, this.scale);
  }

  initPaper(){
    var body = document.body;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);
    body.appendChild(canvas);

    Paper.setup(canvas);
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

  onMouseDrag(event){
    var offset = changeCenter(Paper.view.center, event.delta, 0.6);
    if(Paper.view.center.x - Paper.view.size.width / 2 + offset.x < 0) {
      offset.x = 0;
    }
    if(Paper.view.center.y - Paper.view.size.height / 2 + offset.y < 0) {
      offset.y = 0;
    }
    Paper.view.scrollBy(offset);
  }

  newGame(){
    this.game = new Game();

    var colors = ['#ff0000', '#0000ff'];
    this.players = this.game.players.map(player => new Player(colors.pop(), victorToPoint(player.position).multiply(this.scale)));
    this.players.forEach(p => this.foreGround.addChild(p.groups));
    this.nextTurn();
    this.render();
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame();
    }
    guiPlayer.addPosition(victorToPoint(player.position).multiply(this.scale));
    this.nextTurn();
    this.render();
  }

  nextTurn(){
    this.drawControls(this.game.vectorsForControls);
  }

  drawControls(vectors){
    this.controls.removeChildren();
    vectors
      .map(v => this.createControl(v))
      .forEach(control => this.controls.addChild(control));
  }

  createControl(victor){
    var circle = new Paper.Path.Circle({
      center: victorToPoint(victor.absolute).multiply(this.scale),
      fillColor: '#00ff00',
      strokeColor: 'black',
      strokeWidth: 2,
      opacity: 0.5,
      radius: this.scale/2,
      movePlayerData: victor.relative
    });
    return circle;
  }

  drawGrid(width, height){
    var grid = new Paper.Group();
    this.backGround.addChild(grid);
    for(var x = 0; x < width; x += this.scale){
      var line = new Paper.Path.Line({
        segments: [[x, 0], [x, height]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
    for(var y = 0; y < height; y += this.scale){
      var line = new Paper.Path.Line({
        segments: [[0, y], [width, y]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
  }

  render(){
    Paper.view.draw();
  }
}
